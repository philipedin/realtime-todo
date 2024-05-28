import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it('renders without crashing');

  it('renders home link', () => {
    expect(screen.getByTestId('home-link')).toBeTruthy();
  });
});
