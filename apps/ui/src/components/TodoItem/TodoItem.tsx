import {
  Checkbox,
  Text,
  Stack,
  IconButton,
  Flex,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { Todo } from '@realtime-todo/types';
import { useRef, useState } from 'react';

interface TodoItemProps extends Todo {
  onToggle: (id: string, done: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}

export const TodoItem = ({
  _id,
  title,
  done,
  onToggle,
  onUpdate,
  onRemove,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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
            onBlur={(e) => {
              if (
                e.relatedTarget !== confirmButtonRef.current &&
                e.relatedTarget !== cancelButtonRef.current
              ) {
                handleBlur();
              }
            }}
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
          <>
            <IconButton
              ref={confirmButtonRef}
              aria-label="Confirm edit"
              colorScheme="green"
              icon={<CheckIcon />}
              onClick={handleConfirmEdit}
            />
            <IconButton
              ref={cancelButtonRef}
              aria-label="Cancel edit"
              colorScheme="red"
              icon={<CloseIcon />}
              onClick={handleCancelEdit}
            />
          </>
        ) : (
          <>
            <IconButton
              isDisabled={done}
              aria-label="Edit title"
              icon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            />
            <IconButton
              aria-label="Remove todo"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={handleRemove}
            />
          </>
        )}
      </Stack>
    </Flex>
  );
};
