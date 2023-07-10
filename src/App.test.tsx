import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard';
import Detail from './app/pages/Detail/Detail';
import NotFound from './app/pages/NotFound/NotFound';

describe('DashboardPanel', () => {
  test('renders the Dashboard page', () => {
    render(
      <Router>
        <Dashboard data-testid="dashboard-page" />
      </Router>
    );

    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  test('renders the Detail page', () => {
    render(
      <Router>
        <Detail data-testid="detail-page" />
      </Router>
    );

    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });


  test('renders the Not Found page', () => {
    render(
      <Router>
        <NotFound text='Something to text' data-testid="not-found-page" />
      </Router>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
