import { render, screen } from '@testing-library/react';
import LeftSide from './LeftSide';

describe('LeftSide', () => {
  test('Render the component', () => {
    const mockData = {
      key: 'Test 1',
      value: 'Test 2',
    };
    render(<LeftSide data={mockData} borderTop={true} />);
    const keyElement = screen.getByText('Test 1');
    const valueElement = screen.getByText('Test 2');
    expect(keyElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });
});
