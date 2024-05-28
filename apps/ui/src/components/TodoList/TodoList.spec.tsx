import { render } from '@testing-library/react';

import { Todo, Subtask } from '@realtime-todo/types';
import { TodoList, TodoListProps } from './TodoList';
import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';
import { TodoProvider } from '../../providers/TodoProvider/TodoProvider';

describe('TodoList', () => {
  const mockSubtasks: Subtask[] = [
    { _id: '1', title: 'Subtask 1', order: 0, done: false },
    { _id: '2', title: 'Subtask 2', order: 1, done: true },
  ];
  const mockTodos: Todo[] = [
    {
      _id: '1',
      title: 'Todo 1',
      order: 0,
      done: false,
      subtasks: mockSubtasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      title: 'Todo 2',
      order: 1,
      done: false,
      subtasks: mockSubtasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const mockToggle = vi.fn() as unknown as TodoListProps['onToggle'];
  const mockUpdate = vi.fn() as unknown as TodoListProps['onUpdate'];
  const mockRemove = vi.fn() as unknown as TodoListProps['onRemove'];
  const mockOrderChange = vi.fn() as unknown as TodoListProps['onOrderChange'];

  it('renders without crashing', () => {
    render(
      <SocketProvider>
        <TodoProvider>
          <TodoList
            todos={mockTodos}
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            onOrderChange={mockOrderChange}
          />
        </TodoProvider>
      </SocketProvider>
    );
  });

  it('renders the correct number of todo items', () => {
    const { getAllByRole } = render(
      <SocketProvider>
        <TodoProvider>
          <TodoList
            todos={mockTodos}
            onToggle={mockToggle}
            onUpdate={mockUpdate}
            onRemove={mockRemove}
            onOrderChange={mockOrderChange}
          />
        </TodoProvider>
      </SocketProvider>
    );
    const items = getAllByRole('listitem');
    expect(items.length).toBe(mockTodos.length);
  });
});
