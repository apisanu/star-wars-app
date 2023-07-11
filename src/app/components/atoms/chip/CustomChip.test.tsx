import { render, screen, fireEvent } from '@testing-library/react';
import CustomChip from './CustomChip';

describe('CustomChip', () => {
  test('onClick function on chip click', () => {
    const testOnClick = jest.fn();
    render(
      <CustomChip
        label="Test Chip"
        onClick={testOnClick}
        selected={false}
        icon={undefined}
      />
    );
    const chip = screen.getByText('Test Chip');
    fireEvent.click(chip);
    expect(testOnClick).toHaveBeenCalled();
  });
});
