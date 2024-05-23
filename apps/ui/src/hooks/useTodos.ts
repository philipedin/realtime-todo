import { useContext } from 'react';
import { TodoUpdate } from '@realtime-todo/types';

import { TodoContext } from '../providers/TodoProvider';
import { SocketContext } from '../providers/SocketProvider';

export const useTodos = () => {
  const todos = useContext(TodoContext);
  const { socket } = useContext(SocketContext);
  if (!socket) {
    throw new Error('No SocketProvider found');
  }
  if (!todos) {
    throw new Error('No TodoProvider found');
  }

  const createTodo = (title: string) => {
    socket.emit('createTodo', { title });
  };

  const updateTodo = (_id: string, update: TodoUpdate) => {
    socket.emit('updateTodo', { _id, update });
  };

  const removeTodo = (_id: string) => {
    socket.emit('removeTodo', { _id });
  };

  const reorderTodos = (order: string[]) => {
    socket.emit('reorderTodos', { order });
  };

  return { todos, createTodo, updateTodo, removeTodo, reorderTodos };
};
