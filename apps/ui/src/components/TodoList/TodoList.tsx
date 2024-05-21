import { Stack } from '@chakra-ui/react';
import { Todo } from '@realtime-todo/types';

import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
}

export const TodoList = ({ todos, onToggle }: TodoListProps) => (
  <Stack direction="column" my={8} spacing={4}>
    {todos?.map((todo) => (
      <TodoItem key={todo._id} onToggle={onToggle} {...todo} />
    ))}
  </Stack>
);
