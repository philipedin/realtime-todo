import { useTodos } from '../../hooks/useTodos';
import { TodoList } from '../../components/TodoList/TodoList';
import { CreateTodoForm } from '../../components/CreateTodoForm/CreateTodoForm';

export const IndexPage = () => {
  const { todos, createTodo, updateTodo } = useTodos();

  const handleToggle = (id: string, done: boolean) => {
    updateTodo(id, done);
  };

  return (
    <>
      <CreateTodoForm onSubmit={createTodo} />
      <TodoList todos={todos} onToggle={handleToggle} />
    </>
  );
};
