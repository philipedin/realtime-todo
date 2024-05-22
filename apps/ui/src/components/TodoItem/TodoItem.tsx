import {
  Checkbox,
  Text,
  Stack,
  IconButton,
  Flex,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';

import { Todo } from '@realtime-todo/types';
import { useState } from 'react';

interface TodoItemProps extends Todo {
  onToggle: (id: string, done: boolean) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TodoItem = ({
  _id,
  title,
  done,
  onToggle,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    setIsEditing(false);
    onUpdate(_id, editedTitle);
  };

  return (
    <Flex p={2} justifyContent="space-between">
      <Flex alignItems="center" flex={1}>
        <Checkbox
          mr={2}
          size="lg"
          isChecked={done}
          onChange={() => onToggle(_id, !done)}
        />
        {isEditing ? (
          <Input
            flex={1}
            mr={2}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <Text
            flex={1}
            mr={2}
            fontWeight="bold"
            color={done ? 'gray.500' : undefined}
            onClick={() => {
              if (!done) setIsEditing(true);
            }}
          >
            {title}
          </Text>
        )}
      </Flex>
      <Stack direction="row">
        {isEditing ? (
          <IconButton
            aria-label="Confirm edit"
            colorScheme="green"
            icon={<CheckIcon />}
            onMouseDown={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
          />
        ) : (
          <IconButton
            isDisabled={done}
            aria-label="Edit title"
            icon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          />
        )}
      </Stack>
    </Flex>
  );
};
