import { useContext } from 'react';
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

  const updateTodo = (_id: string, done: boolean) => {
    socket.emit('updateTodo', { _id, done });
  };

  return { todos, createTodo, updateTodo };
};
