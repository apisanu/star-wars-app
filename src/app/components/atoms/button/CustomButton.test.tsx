import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  test('onPress function on button click', () => {
    const testOnPress = jest.fn();
    render(<CustomButton text="Test click" onPress={testOnPress} />);
    const button = screen.getByText('Test click');
    fireEvent.click(button);
    expect(testOnPress).toHaveBeenCalled();
  });
});
