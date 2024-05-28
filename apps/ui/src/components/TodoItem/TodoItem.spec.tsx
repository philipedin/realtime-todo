import { render, fireEvent } from '@testing-library/react';

import { Todo } from '@realtime-todo/types';
import { TodoItem, TodoItemProps } from './TodoItem';
import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';
import { TodoProvider } from '../../providers/TodoProvider/TodoProvider';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    _id: '1',
    title: 'Todo 1',
    order: 0,
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    subtasks: [
      { _id: '1', title: 'Subtask 1', order: 0, done: false },
      { _id: '2', title: 'Subtask 2', order: 1, done: true },
    ],
  };
  const mockToggle = vi.fn() as unknown as TodoItemProps['onToggle'];
  const mockUpdate = vi.fn() as unknown as TodoItemProps['onUpdate'];
  const mockRemove = vi.fn() as unknown as TodoItemProps['onRemove'];

  it('renders without crashing', () => {
    render(
      <SocketProvider>
        <TodoProvider>
          <TodoItem
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            {...mockTodo}
          />
        </TodoProvider>
      </SocketProvider>
    );
  });

  it('shows the edit button when not in editing mode', () => {
    const { getByLabelText } = render(
      <SocketProvider>
        <TodoProvider>
          <TodoItem
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            {...mockTodo}
          />
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByLabelText('Edit title')).toBeTruthy();
  });

  it('shows the delete button', () => {
    const { getByLabelText } = render(
      <SocketProvider>
        <TodoProvider>
          <TodoItem
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            {...mockTodo}
          />
        </TodoProvider>
      </SocketProvider>
    );
    expect(getByLabelText('Remove todo')).toBeTruthy();
  });

  it('enters editing mode when the edit button is clicked', async () => {
    const { getByLabelText } = render(
      <SocketProvider>
        <TodoProvider>
          <TodoItem
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            {...mockTodo}
          />
        </TodoProvider>
      </SocketProvider>
    );

    fireEvent.click(getByLabelText('Edit title'));

    expect(getByLabelText('Confirm edit')).toBeTruthy();
    expect(getByLabelText('Cancel edit')).toBeTruthy();
  });

  it('calls the remove handler when the delete button is clicked', () => {
    const { getByLabelText } = render(
      <SocketProvider>
        <TodoProvider>
          <TodoItem
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            {...mockTodo}
          />
        </TodoProvider>
      </SocketProvider>
    );

    fireEvent.click(getByLabelText('Remove todo'));

    expect(mockRemove).toHaveBeenCalled();
  });
});
