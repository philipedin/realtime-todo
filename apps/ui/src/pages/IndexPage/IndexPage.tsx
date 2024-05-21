import { FormEvent, useState } from 'react';
import { Box, Button, Input, Stack } from '@chakra-ui/react';

import { useTodos } from '../../hooks/useTodos';
import { TodoList } from '../../components/TodoList/TodoList';

export const IndexPage = () => {
  const [inputText, setInputText] = useState('');
  const { todos, createTodo, updateTodo } = useTodos();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTodo(inputText);
    setInputText('');
  };

  const handleToggle = (id: string, done: boolean) => {
    updateTodo(id, done);
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
      <TodoList todos={todos} onToggle={handleToggle} />
    </Box>
  );
};
