import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/home.component';
import Login from './components/login.component';
import CreateNode from './components/createNode.component';

import AuthService from './services/auth.service';

const loggedIn = AuthService.currentUser();

const App = () => {
  return <Routes>
        <Route exact path="/" element={loggedIn ? <Home /> : <Login />} />
        <Route path="nodes" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="createNode" element={<RequireAuth><CreateNode /></RequireAuth>} />
    </Routes>;
};

function RequireAuth({children}) {
  return loggedIn ? children : <Navigate to="/" />
}

export default App;
