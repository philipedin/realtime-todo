import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/interfaces';

import { getConfig } from './config/config';
import { createLogger } from './logger/logger';
import { createHttpLogger } from './middleware/express/httpLogger';
import { validateData } from './middleware/websockets/validateData';
import { createTodoService } from './services/todo';
import { TodoModel } from './models/todo';
import { SubtaskModel } from './models/subtask';
import { db } from './db/db';

const config = getConfig();
const logger = createLogger(config);
const httpLogger = createHttpLogger(config, logger);

const main = async () => {
  const app = express();
  const server = createServer(app);
  const database = db(logger, config.mongodbUri);
  await database.connect();

  logger.debug(config, 'config');

  app.use(httpLogger);
  app.use(cors());

  const todoService = createTodoService({
    todoModel: TodoModel,
    subtaskModel: SubtaskModel,
  });
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    },
  });

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  io.on('connection', async (socket) => {
    logger.info('socket connection initiated');

    socket.use(validateData(logger, socket));

    const todos = await todoService.listTodos();

    socket.emit('todos', todos);

    socket.on('createTodo', async ({ title }) => {
      try {
        await todoService.createTodo(title);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to create todo');
        socket.emit('error', { message: 'Failed to create todo' });
      }
    });

    socket.on('updateTodo', async ({ _id, update }) => {
      try {
        await todoService.updateTodo(_id, update);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to update todo');
        socket.emit('error', { message: 'Failed to update todo' });
      }
    });

    socket.on('removeTodo', async ({ _id }) => {
      try {
        await todoService.removeTodo(_id);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to remove todo');
        socket.emit('error', { message: 'Failed to remove todo' });
      }
    });

    socket.on('reorderTodos', async ({ order }) => {
      try {
        await todoService.reorderTodos(order);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to reorder todos');
        socket.emit('error', { message: 'Failed to reorder todos' });
      }
    });

    socket.on('createSubtask', async ({ todoId, title }) => {
      try {
        await todoService.createSubtask(todoId, title);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to create subtask');
        socket.emit('error', { message: 'Failed to create subtask' });
      }
    });

    socket.on('updateSubtask', async ({ _id, subtaskId, update }) => {
      try {
        await todoService.updateSubtask(_id, subtaskId, update);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to update subtask');
        socket.emit('error', { message: 'Failed to update subtask' });
      }
    });

    socket.on('removeSubtask', async ({ _id, subtaskId }) => {
      try {
        await todoService.removeSubtask(_id, subtaskId);
        const todos = await todoService.listTodos();

        io.emit('todos', todos);
      } catch (error) {
        logger.error(error, 'Failed to remove subtask');
        socket.emit('error', { message: 'Failed to remove subtask' });
      }
    });

    socket.on('disconnect', () => {
      logger.info('socket connection closed');
    });
  });

  server.listen(config.port, config.host, () => {
    logger.info(`ready at: http://${config.host}:${config.port}`);
  });
};

main().catch((error) => {
  logger.error(error, 'Unhandled error occurred');
  process.exit(1);
});
