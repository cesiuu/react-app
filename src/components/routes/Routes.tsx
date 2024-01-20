import React from 'react';
import { BrowserRouter as Router, Route, Routes as RRoutes } from 'react-router-dom';
import Home from './Home';

const Routes: React.FC = () => {
  return (
    <Router>
      <RRoutes>
        <Route path="/" element={<Home />} />
      </RRoutes>
    </Router>
  );
};

export default Routes;
