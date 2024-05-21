import { Checkbox, Text, Box } from '@chakra-ui/react';
import { Todo } from '@realtime-todo/types';

interface TodoItemProps extends Todo {
  onToggle: (id: string, done: boolean) => void;
}

export const TodoItem = ({ _id, title, done, onToggle }: TodoItemProps) => (
  <Box p={2}>
    <Checkbox size="lg" isChecked={done} onChange={() => onToggle(_id, !done)}>
      <Text fontWeight="bold" color={done ? 'gray.500' : undefined}>
        {title}
      </Text>
    </Checkbox>
  </Box>
);
