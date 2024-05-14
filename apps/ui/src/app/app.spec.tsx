import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import { SocketProvider } from '../providers/SocketProvider';
import { TodoProvider } from '../providers/TodoProvider';
import { App } from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByText('Welcome to Realtime Todo')).toBeTruthy();
  });
});
