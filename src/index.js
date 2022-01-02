import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import Login from './components/login.component';

import 'materialize-css/dist/css/materialize.min.css'
import './style.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
