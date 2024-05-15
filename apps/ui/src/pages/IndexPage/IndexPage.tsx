import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';

export const IndexPage = () => {
  const [inputText, setInputText] = useState('');
  const { todos, createTodo } = useTodos();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClickCreate = () => {
    createTodo(inputText);
    setInputText('');
  };
  return (
    <div>
      <div>Welcome to Realtime Todo</div>
      <div>
        <input
          type="text"
          placeholder="New todo"
          value={inputText}
          onChange={handleTextChange}
        />
        <button onClick={handleClickCreate}>Create</button>
      </div>
      <div>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};