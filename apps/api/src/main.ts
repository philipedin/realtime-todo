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

  const todoService = createTodoService(TodoModel);
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
      await todoService.createTodo(title);
      const todos = await todoService.listTodos();

      io.emit('todos', todos);
    });

    socket.on('updateTodo', async ({ _id, done }) => {
      await todoService.updateTodo(_id, done);
      const todos = await todoService.listTodos();

      io.emit('todos', todos);
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
