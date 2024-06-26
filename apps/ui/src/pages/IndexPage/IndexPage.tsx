import { useMemo, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { useTodos } from '../../hooks/useTodos';
import { TodoList } from '../../components/TodoList/TodoList';
import { CreateTodoForm } from '../../components/CreateTodoForm/CreateTodoForm';
import { TodoFilterSwitch } from '../../components/TodoFilterSwitch/TodoFilterSwitch';

export const IndexPage = () => {
  const { todos, createTodo, updateTodo, removeTodo, reorderTodos } =
    useTodos();
  const [showDone, setShowDone] = useState(false);

  const handleTodoToggle = (id: string, done: boolean) => {
    updateTodo(id, { done });
  };

  const handleFilterToggle = () => {
    setShowDone(!showDone);
  };

  const handleTodoUpdate = (id: string, title: string) => {
    updateTodo(id, { title });
  };

  const handleTodoRemove = (id: string) => {
    removeTodo(id);
  };

  const handleOrderChange = (order: string[]) => {
    reorderTodos(order);
  };

  const filteredTodos = useMemo(() => {
    return showDone
      ? todos.filter((todo) => todo.done)
      : todos.filter((todo) => !todo.done);
  }, [showDone, todos]);

  return (
    <>
      <CreateTodoForm onSubmit={createTodo} />
      <Box mt={6}>
        <TodoFilterSwitch onToggle={handleFilterToggle} showDone={showDone} />
      </Box>
      <Box mt={8}>
        <TodoList
          todos={filteredTodos}
          onToggle={handleTodoToggle}
          onUpdate={handleTodoUpdate}
          onRemove={handleTodoRemove}
          onOrderChange={handleOrderChange}
        />
      </Box>
    </>
  );
};
