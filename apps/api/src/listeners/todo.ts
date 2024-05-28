import { Server, Socket } from 'socket.io';
import { TodoService } from '../services/todo';
import { Logger } from '../logger/logger';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@realtime-todo/interfaces';

export const createTodoListener = (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  todoService: TodoService,
  logger: Logger
) => {
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
};
