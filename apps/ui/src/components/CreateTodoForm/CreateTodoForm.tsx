import { FormEvent, useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

interface CreateTodoFormProps {
  onSubmit: (title: string) => void;
}

export const CreateTodoForm = ({ onSubmit }: CreateTodoFormProps) => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <Input
          flex={1}
          placeholder="New todo"
          value={inputText}
          onChange={handleTextChange}
        />
        <Button type="submit">Create</Button>
      </Stack>
    </form>
  );
};
