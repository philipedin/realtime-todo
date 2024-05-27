import { useState } from 'react';
import { Stack, Input, IconButton, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface CreateSubtaskFormProps {
  onSubmit: (title: string) => void;
}

export const CreateSubtaskForm = ({ onSubmit }: CreateSubtaskFormProps) => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <Input
          flex={1}
          size="sm"
          placeholder="New subtask"
          value={inputText}
          onChange={handleTextChange}
        />
        <IconButton
          type="submit"
          aria-label="Add subtask"
          size="sm"
          icon={<AddIcon />}
        />
        <Spacer />
      </Stack>
    </form>
  );
};
