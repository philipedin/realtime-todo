import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage/IndexPage';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  </BrowserRouter>
);
