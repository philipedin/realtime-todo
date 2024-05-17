import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Todo } from '@realtime-todo/types';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/interfaces';

import { getConfig } from './config/config';
import { createLogger } from './logger/logger';
import { createHttpLogger } from './middleware/express/httpLogger';
import { validateData } from './middleware/websockets/validateData';

const config = getConfig();
const logger = createLogger(config);
const httpLogger = createHttpLogger(config, logger);
const app = express();
const server = createServer(app);

logger.debug(config, 'config');

app.use(httpLogger);
app.use(cors());

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  },
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const todos: Todo[] = [
  { id: '1', title: 'Todo 1' },
  { id: '2', title: 'Todo 2' },
];

io.on('connection', (socket) => {
  socket.use(validateData(logger, socket));
  logger.info('socket connection initiated');

  socket.emit('todos', todos);

  socket.on('createTodo', ({ title }) => {
    const todo = { id: String(todos.length + 1), title };
    todos.push(todo);
    io.emit('todos', todos);
  });

  socket.on('disconnect', () => {
    logger.info('socket connection closed');
  });
});

server.listen(config.port, config.host, () => {
  logger.info(`ready at: http://${config.host}:${config.port}`);
});
