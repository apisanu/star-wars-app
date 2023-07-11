import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPanel from './DashboardPanel';

describe('DashboardPanel', () => {
  test('renders the component', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard-panel')).toBeInTheDocument();
  });

  test('displays filter chips', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    expect(screen.getByTestId('filter-chips')).toBeInTheDocument();
  });

  test('renders the Tile components', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    expect(screen.getByTestId('tile')).toBeInTheDocument();
  });
});
