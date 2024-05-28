import { render, fireEvent } from '@testing-library/react';
import { SubtaskItem, SubtaskItemProps } from './SubtaskItem';
import { Subtask } from '@realtime-todo/types';

describe('SubtaskItem', () => {
  const mockToggle = vi.fn() as unknown as SubtaskItemProps['onToggle'];
  const mockUpdate = vi.fn() as unknown as SubtaskItemProps['onUpdate'];
  const mockRemove = vi.fn() as unknown as SubtaskItemProps['onRemove'];
  const mockSubtask: Subtask = {
    _id: '1',
    title: 'Test subtask',
    order: 0,
    done: false,
  };

  it('renders without crashing', () => {
    render(
      <SubtaskItem
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onRemove={mockRemove}
        {...mockSubtask}
      />
    );
  });

  it('calls onToggle prop when checkbox is clicked', () => {
    const { getByRole } = render(
      <SubtaskItem
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onRemove={mockRemove}
        {...mockSubtask}
      />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(mockToggle).toHaveBeenCalled();
  });

  it('changes value when input is edited', () => {
    const { getByText, getByRole } = render(
      <SubtaskItem
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onRemove={mockRemove}
        {...mockSubtask}
      />
    );

    fireEvent.click(getByText('Test subtask'));
    fireEvent.change(getByRole('textbox'), {
      target: { value: 'Changed' },
    });

    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('Changed');
  });
});
