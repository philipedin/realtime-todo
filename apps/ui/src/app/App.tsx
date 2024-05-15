import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SocketProvider } from '../providers/SocketProvider';
import { TodoProvider } from '../providers/TodoProvider';
import { Router } from '../router/router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

export const App = () => (
  <StrictMode>
    <SocketProvider>
      <TodoProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <AppLayout>
              <Router />
            </AppLayout>
          </BrowserRouter>
        </ChakraProvider>
      </TodoProvider>
    </SocketProvider>
  </StrictMode>
);
