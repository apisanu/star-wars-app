import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard';
import Detail from './app/pages/Detail/Detail';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/detail/:id" element={<Detail/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
