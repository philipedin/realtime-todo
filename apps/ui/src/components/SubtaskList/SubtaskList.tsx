import { Stack } from '@chakra-ui/react';
import { Subtask } from '@realtime-todo/types';

import { useTodos } from '../../hooks/useTodos';
import { CreateSubtaskForm } from '../CreateSubtaskForm/CreateSubtaskForm';
import { SubtaskItem } from '../SubtaskItem/SubtaskItem';

interface SubtaskListProps {
  todoId: string;
  done: boolean;
  subtasks: Subtask[];
}

export const SubtaskList = ({ todoId, done, subtasks }: SubtaskListProps) => {
  const { createSubtask, updateSubtask, removeSubtask } = useTodos();

  const handleSubmit = (title: string) => {
    createSubtask(todoId, title);
  };

  const handleToggle = (_id: string, done: boolean) => {
    updateSubtask(todoId, _id, { done });
  };

  const handleUpdate = (_id: string, title: string) => {
    updateSubtask(todoId, _id, { title });
  };

  const handleRemove = (_id: string) => {
    removeSubtask(todoId, _id);
  };

  return (
    <Stack spacing={2}>
      {subtasks.map((subtask) => (
        <SubtaskItem
          key={subtask._id}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          {...subtask}
        />
      ))}
      {!done && <CreateSubtaskForm onSubmit={handleSubmit} />}
    </Stack>
  );
};
