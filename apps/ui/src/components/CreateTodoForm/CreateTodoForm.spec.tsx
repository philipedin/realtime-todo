import { render, fireEvent } from '@testing-library/react';
import { CreateTodoForm } from './CreateTodoForm';

describe('CreateTodoForm', () => {
  it('renders without crashing', () => {
    const mockSubmit = vi.fn();
    render(<CreateTodoForm onSubmit={mockSubmit} />);
  });

  it('calls onSubmit prop when form is submitted', async () => {
    const mockSubmit = vi.fn();
    const { getByPlaceholderText, getByRole } = render(
      <CreateTodoForm onSubmit={mockSubmit} />
    );

    fireEvent.change(getByPlaceholderText('New todo'), {
      target: { value: 'Test todo' },
    });
    fireEvent.click(getByRole('button'));

    expect(mockSubmit).toHaveBeenCalledWith('Test todo');
  });

  it('clears the input field after form submission', async () => {
    const mockSubmit = vi.fn();
    const { getByPlaceholderText, getByRole } = render(
      <CreateTodoForm onSubmit={mockSubmit} />
    );

    fireEvent.change(getByPlaceholderText('New todo'), {
      target: { value: 'Test todo' },
    });
    fireEvent.click(getByRole('button'));

    const inputElement = getByPlaceholderText('New todo') as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });
});
