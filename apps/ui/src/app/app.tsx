import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to Realtime Todo</div>} />
    </Routes>
  );
};
