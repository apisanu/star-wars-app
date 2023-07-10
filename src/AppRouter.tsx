import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard';
import Detail from './app/pages/Detail/Detail';
import NotFound from './app/pages/NotFound/NotFound';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="*" element={<NotFound text='Page Not Found'/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
