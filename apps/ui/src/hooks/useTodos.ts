import { useContext } from 'react';
import { TodoContext } from '../providers/TodoProvider';

export const useTodos = () => {
  const todos = useContext(TodoContext);
  if (!todos) {
    throw new Error('No TodoProvider found');
  }

  return { todos };
};
