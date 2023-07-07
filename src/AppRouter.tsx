import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default AppRouter;
