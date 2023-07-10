import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPanel from './DashboardPanel';

describe('DashboardPanel', () => {
  test('renders the component', () => {
    render(<DashboardPanel />);
    expect(screen.getByTestId('dashboard-panel')).toBeInTheDocument();
  });
});
