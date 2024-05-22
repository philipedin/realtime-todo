import { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from './SocketProvider';
import { Todo } from '@realtime-todo/types';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoContext = createContext<Todo[] | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const handleTodos = (todos: Todo[]) => {
      setTodos(todos);
    };

    socket.on('todos', handleTodos);

    return () => {
      socket.off('todos', handleTodos);
    };
  }, [socket]);

  return <TodoContext.Provider value={todos}>{children}</TodoContext.Provider>;
};
