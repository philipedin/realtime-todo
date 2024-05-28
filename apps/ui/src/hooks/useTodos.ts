import { useContext } from 'react';
import { SubtaskUpdate, TodoUpdate } from '@realtime-todo/types';

import { TodoContext } from '../providers/TodoProvider/TodoProvider';
import { SocketContext } from '../providers/SocketProvider/SocketProvider';

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

  const createSubtask = (todoId: string, title: string) => {
    socket.emit('createSubtask', { todoId, title });
  };

  const updateSubtask = (
    _id: string,
    subtaskId: string,
    update: SubtaskUpdate
  ) => {
    console.log({
      _id,
      subtaskId,
      update,
    });
    socket.emit('updateSubtask', { _id, subtaskId, update });
  };

  const removeSubtask = (_id: string, subtaskId: string) => {
    socket.emit('removeSubtask', { _id, subtaskId });
  };

  return {
    todos,
    createTodo,
    updateTodo,
    removeTodo,
    reorderTodos,
    createSubtask,
    removeSubtask,
    updateSubtask,
  };
};
