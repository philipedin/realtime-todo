import { StrictMode } from 'react';
import { SocketProvider } from '../providers/SocketProvider';
import { TodoProvider } from '../providers/TodoProvider';
import { Router } from '../router/router';

export const App = () => (
  <StrictMode>
    <SocketProvider>
      <TodoProvider>
        <Router />
      </TodoProvider>
    </SocketProvider>
  </StrictMode>
);
