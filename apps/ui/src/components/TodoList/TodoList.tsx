import { useEffect, useMemo, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { Reorder } from 'framer-motion';
import { Todo } from '@realtime-todo/types';

import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onRemove: (id: string) => void;
  onOrderChange: (order: string[]) => void;
}

export const TodoList = ({
  todos,
  onToggle,
  onUpdate,
  onRemove,
  onOrderChange,
}: TodoListProps) => {
  const [items, setItems] = useState(todos);

  const debouncedOnOrderChange = useMemo(
    () => debounce(onOrderChange, 1000),
    [onOrderChange]
  );

  const handleReorder = (newItems: Todo[]) => {
    setItems(newItems);
    debouncedOnOrderChange(newItems.map((item) => item._id));
  };

  useEffect(() => {
    setItems(todos);
  }, [todos]);

  return (
    <Stack
      as={Reorder.Group<Todo>}
      spacing={4}
      axis="y"
      values={items}
      onReorder={handleReorder}
      listStyleType="none"
    >
      {items?.map((item) => (
        <Reorder.Item key={item._id} value={item}>
          <TodoItem
            onToggle={onToggle}
            onUpdate={onUpdate}
            onRemove={onRemove}
            {...item}
          />
        </Reorder.Item>
      ))}
    </Stack>
  );
};
