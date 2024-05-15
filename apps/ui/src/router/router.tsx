import { Route, Routes } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage/IndexPage';

export const Router = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
  </Routes>
);
