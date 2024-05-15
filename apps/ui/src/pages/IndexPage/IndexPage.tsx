import { FormEvent, useState } from 'react';
import { Text, Box, Button, Input, Stack } from '@chakra-ui/react';

import { useTodos } from '../../hooks/useTodos';

export const IndexPage = () => {
  const [inputText, setInputText] = useState('');
  const { todos, createTodo } = useTodos();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTodo(inputText);
    setInputText('');
  };

  return (
    <Box>
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
      <Stack direction="column" my={8} spacing={4}>
        {todos?.map((todo) => (
          <Box key={todo.id} p={2}>
            <Text fontWeight="bold">{todo.title}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
