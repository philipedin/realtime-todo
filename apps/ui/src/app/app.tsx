import { Route, Routes } from 'react-router-dom';
import { useTodos } from '../hooks/useTodos';

export const App = () => {
  const { todos } = useTodos();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div>Welcome to Realtime Todo</div>
            <div>
              <ul>
                {todos?.map((todo) => (
                  <li key={todo.id}>{todo.title}</li>
                ))}
              </ul>
            </div>
          </div>
        }
      />
    </Routes>
  );
};
