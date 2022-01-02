import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/home.component';
import Login from './components/login.component';
import Nodes from './components/nodes.component';

import UserService from './services/user.service';
import AuthService from './services/auth.service';

const loggedIn = AuthService.currentUser();

const App = () => {
  return <Routes>
    <Route path="/" element={loggedIn ? <Home /> : <Login />} />
    <Route path="/nodes" element={<RequireAuth><Home /></RequireAuth>} />
  </Routes>
};

function RequireAuth({children}) {
  return loggedIn ? children : <Navigate to="/" />
}

export default App;
