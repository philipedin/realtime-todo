import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';
import { TodoProvider } from '../../providers/TodoProvider/TodoProvider';

describe('AppLayout', () => {
  it('renders without crashing', () => {
    render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <AppLayout>
              <div />
            </AppLayout>
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
  });

  it('renders the children', () => {
    const { getByText } = render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <AppLayout>
              <div>Child</div>
            </AppLayout>
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByText('Child')).toBeTruthy();
  });

  it('renders the NetworkStatusIndicator', () => {
    const { getByTestId } = render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <AppLayout>
              <div />
            </AppLayout>
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByTestId('network-status-indicator')).toBeTruthy();
  });

  it('renders the Header', () => {
    const { getByTestId } = render(
      <SocketProvider>
        <TodoProvider>
          <BrowserRouter>
            <AppLayout>
              <div />
            </AppLayout>
          </BrowserRouter>
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByTestId('header')).toBeTruthy();
  });
});
