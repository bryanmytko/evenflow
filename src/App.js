import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, ChartCreate } from './components';

import AuthService from './services/auth.service';

const loggedIn = AuthService.currentUser();

const App = () => {
  return <Routes>
      <Route exact path="/" element={loggedIn ? <Home /> : <Login />} />
      <Route path="chart/create" element={<RequireAuth><ChartCreate /></RequireAuth>} />
    </Routes>;
};

function RequireAuth({children}) {
  return loggedIn ? children : <Navigate to="/" />
}

export default App;
