import { render, fireEvent } from '@testing-library/react';
import { TodoFilterSwitch } from './TodoFilterSwitch';

describe('TodoFilterSwitch', () => {
  const mockToggle = vi.fn();

  it('renders without crashing', () => {
    render(<TodoFilterSwitch showDone={false} onToggle={mockToggle} />);
  });

  it('triggers toggle on click', () => {
    const { getByRole } = render(
      <TodoFilterSwitch showDone={false} onToggle={mockToggle} />
    );

    const switchElement = getByRole('checkbox');

    fireEvent.click(switchElement);

    expect(mockToggle).toHaveBeenCalled();
  });
});
