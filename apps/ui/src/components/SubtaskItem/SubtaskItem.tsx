import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Checkbox, Text, IconButton, Input } from '@chakra-ui/react';
import { Subtask } from '@realtime-todo/types';
import { useState } from 'react';

export interface SubtaskItemProps extends Subtask {
  onToggle: (id: string, done: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}

export const SubtaskItem = ({
  _id,
  title,
  done,
  onToggle,
  onUpdate,
  onRemove,
}: SubtaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleBlur = () => {
    handleCancelEdit();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleConfirmEdit();
    }
  };

  const handleConfirmEdit = () => {
    setIsEditing(false);
    onUpdate(_id, editedTitle);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleRemove = () => {
    onRemove(_id);
  };

  const handleToggle = () => {
    onToggle(_id, !done);
  };

  return (
    <Flex key={title} alignItems="center" justifyContent="space-between">
      <Flex flex={1}>
        <Checkbox size="sm" isChecked={done} onChange={handleToggle} />
        {isEditing ? (
          <Input
            ml={2}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            size="sm"
            onBlur={(e) => {
              handleBlur();
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <Text
            ml={2}
            textDecoration={done ? 'line-through' : undefined}
            color={done ? 'gray.500' : undefined}
            onClick={() => {
              if (!done) setIsEditing(true);
            }}
          >
            {title}
          </Text>
        )}
      </Flex>
      <IconButton
        ml={2}
        size="sm"
        variant="ghost"
        aria-label="Remove subtask"
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={handleRemove}
      />
    </Flex>
  );
};
