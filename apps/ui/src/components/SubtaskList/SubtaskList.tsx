import { Stack, Flex, Checkbox, Text } from '@chakra-ui/react';
import { Subtask } from '@realtime-todo/types';

import { useTodos } from '../../hooks/useTodos';
import { CreateSubtaskForm } from '../CreateSubtaskForm/CreateSubtaskForm';

interface SubtaskListProps {
  todoId: string;
  subtasks: Subtask[];
}

export const SubtaskList = ({ todoId, subtasks }: SubtaskListProps) => {
  const { createSubtask } = useTodos();

  const handleSubmit = (title: string) => {
    createSubtask(todoId, title);
  };

  return (
    <Stack spacing={2}>
      {subtasks.map((subtask) => (
        <Flex key={subtask.title} alignItems="center">
          <Checkbox size="sm" isChecked={subtask.done} />
          <Text
            ml={2}
            color={subtask.done ? 'gray.500' : undefined}
            textDecoration={subtask.done ? 'line-through' : undefined}
          >
            {subtask.title}
          </Text>
        </Flex>
      ))}
      <CreateSubtaskForm onSubmit={handleSubmit} />
    </Stack>
  );
};
