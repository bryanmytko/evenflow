import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './App';
import { Chart, ChartCreate, ChartEdit, Home, Login, Signup } from './components';
import AuthService from './services/auth.service';

import 'materialize-css/dist/css/materialize.min.css'
import './style.css';

const RequireAuth = ({ children }) => {
  return AuthService.currentUser() ? children : <Navigate to="/login" />;
}

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="chart">
          <Route path="create" element={<RequireAuth><ChartCreate /></RequireAuth>} />
          <Route path="edit/:id" element={<RequireAuth><ChartEdit /></RequireAuth>} />
          <Route path=":id" element={<Chart />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
