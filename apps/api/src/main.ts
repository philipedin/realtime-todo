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
import { createTodoListener } from './listeners/todo';

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

  io.on('connection', async (socket) => {
    logger.info('socket connection initiated');

    socket.use(validateData(logger, socket));

    const todos = await todoService.listTodos();

    socket.emit('todos', todos);

    createTodoListener(io, socket, todoService, logger);

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
