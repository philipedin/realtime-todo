import { render, fireEvent } from '@testing-library/react';
import { Subtask } from '@realtime-todo/types';

import { SubtaskList } from './SubtaskList';
import { SocketProvider } from '../../providers/SocketProvider/SocketProvider';
import { TodoProvider } from '../../providers/TodoProvider/TodoProvider';

const mockCreateSubtask = vi.fn();
const mockUpdateSubtask = vi.fn();
const mockRemoveSubtask = vi.fn();

vi.mock('../../hooks/useTodos', () => ({
  useTodos: () => ({
    createSubtask: mockCreateSubtask,
    updateSubtask: mockUpdateSubtask,
    removeSubtask: mockRemoveSubtask,
  }),
}));

describe('SubtaskList', () => {
  const mockSubtasks: Subtask[] = [
    { _id: '1', title: 'Subtask 1', order: 0, done: false },
    { _id: '2', title: 'Subtask 2', order: 1, done: true },
  ];

  it('renders without crashing', () => {
    render(
      <SocketProvider>
        <TodoProvider>
          <SubtaskList todoId="1" done={false} subtasks={mockSubtasks} />
        </TodoProvider>
      </SocketProvider>
    );
  });

  it('renders the correct number of subtasks', () => {
    const { getAllByRole } = render(
      <SocketProvider>
        <TodoProvider>
          <SubtaskList todoId="1" done={false} subtasks={mockSubtasks} />
        </TodoProvider>
      </SocketProvider>
    );
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes.length).toBe(mockSubtasks.length);
  });

  it('calls updateSubtask when a subtask is toggled', () => {
    const { getAllByRole } = render(
      <SocketProvider>
        <TodoProvider>
          <SubtaskList todoId="1" done={false} subtasks={mockSubtasks} />
        </TodoProvider>
      </SocketProvider>
    );

    fireEvent.click(getAllByRole('checkbox')[0]);

    expect(mockUpdateSubtask).toHaveBeenCalledTimes(1);
  });

  it('calls removeSubtask when a subtask is removed', () => {
    const { getAllByLabelText } = render(
      <SocketProvider>
        <TodoProvider>
          <SubtaskList todoId="1" done={false} subtasks={mockSubtasks} />
        </TodoProvider>
      </SocketProvider>
    );

    fireEvent.click(getAllByLabelText('Remove subtask')[0]);

    expect(mockRemoveSubtask).toHaveBeenCalledTimes(1);
  });
});
