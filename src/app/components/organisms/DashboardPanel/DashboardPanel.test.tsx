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

  test('Show tiles', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    const tiles = screen.getAllByTestId('tile');
    expect(tiles).toHaveLength(10);
  });

  test('Change results on pagination component click', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    const paginationButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(paginationButton);

    const tiles = screen.getAllByTestId('tile');
    expect(tiles).toHaveLength(10);

    expect(
      screen.getByRole('button', { name: '2', selected: true })
    ).toBeInTheDocument();
  });

  test('Navigates to detail-page on tile click', () => {
    render(
      <MemoryRouter>
        <DashboardPanel />
      </MemoryRouter>
    );
    const tile = screen.getByTestId('tile');
    fireEvent.click(tile);

    expect(window.location.pathname).toBe('/detail/1?type=film');
  });
});
