import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard';
import Detail from './app/pages/Detail/Detail';
import AppRouter from './AppRouter';

describe('AppRouter', () => {
  test('renders the Dashboard page for /dashboard route', () => {
    render(
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  test('renders the Dashboard page for / route', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  test('renders the Detail page for /detail/:id route', () => {
    render(
      <Router>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    );
    expect(screen.getByTestId('detail-page')).toBeInTheDocument();
  });

  test('renders the 404 page for an unknown route', () => {
    render(
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    );
    expect(screen.getByTestId('404-page')).toBeInTheDocument();
  });
});
