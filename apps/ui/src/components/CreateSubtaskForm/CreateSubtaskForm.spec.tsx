import { render, fireEvent } from '@testing-library/react';
import { CreateSubtaskForm } from './CreateSubtaskForm';

describe('CreateSubtaskForm', () => {
  it('renders without crashing', () => {
    const mockSubmit = vi.fn();
    render(<CreateSubtaskForm onSubmit={mockSubmit} />);
  });

  it('calls onSubmit prop when form is submitted', () => {
    const mockSubmit = vi.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <CreateSubtaskForm onSubmit={mockSubmit} />
    );

    fireEvent.change(getByPlaceholderText('New subtask'), {
      target: { value: 'Test subtask' },
    });
    fireEvent.click(getByLabelText('Add subtask'));

    expect(mockSubmit).toHaveBeenCalledWith('Test subtask');
  });

  it('clears the input field after form submission', () => {
    const mockSubmit = vi.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <CreateSubtaskForm onSubmit={mockSubmit} />
    );

    const inputElement = getByPlaceholderText(
      'New subtask'
    ) as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: 'Test subtask' },
    });
    fireEvent.click(getByLabelText('Add subtask'));

    expect(inputElement.value).toBe('');
  });
});
