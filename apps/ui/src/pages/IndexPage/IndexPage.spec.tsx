import { render, screen } from '@testing-library/react';

import { IndexPage } from './IndexPage';
import { TodoProvider } from '../../providers/TodoProvider/TodoProvider';
import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';

describe('IndexPage', () => {
  beforeEach(() => {
    render(
      <SocketProvider>
        <TodoProvider>
          <IndexPage />
        </TodoProvider>
      </SocketProvider>
    );
  });

  it('renders without crashing');

  it('renders TodoList', () => {
    expect(screen.getByTestId('todo-list')).toBeTruthy();
  });

  it('renders CreateTodoForm', () => {
    expect(screen.getByTestId('create-todo-form')).toBeTruthy();
  });

  it('renders TodoFilterSwitch', () => {
    expect(screen.getByTestId('todo-filter-switch')).toBeTruthy();
  });
});
