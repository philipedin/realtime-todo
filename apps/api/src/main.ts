import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import {
  ClientToServerEvents,
  ServerToClientEvents,
  Todo,
} from '@realtime-todo/types';
import { getConfig } from './config/config';

const config = getConfig();
const app = express();
const server = createServer(app);

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
  console.log('Connection initiated');

  socket.emit('todos', todos);

  socket.on('createTodo', ({ title }) => {
    const todo = { id: String(todos.length + 1), title };
    todos.push(todo);
    io.emit('todos', todos);
  });

  socket.on('disconnect', () => {
    console.log('Connection closed');
  });
});

server.listen(config.port, config.host, () => {
  console.log(`[ ready ] http://${config.host}:${config.port}`);
});
