import { Stack } from '@chakra-ui/react';
import { Todo } from '@realtime-todo/types';

import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TodoList = ({ todos, onToggle, onUpdate }: TodoListProps) => (
  <Stack direction="column" spacing={4}>
    {todos?.map((todo) => (
      <TodoItem
        key={todo._id}
        onToggle={onToggle}
        onUpdate={onUpdate}
        {...todo}
      />
    ))}
  </Stack>
);
