import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from './App';
import AuthService from './services/auth.service';
import Login from './components/login.component';
import Header from './components/layout/header.component';
import Footer from './components/layout/footer.component';

import 'materialize-css/dist/css/materialize.min.css'
import './style.css';

render(
  <BrowserRouter>
    <Header />
    <main className="grey lighten-4">
      <App />
    </main>
    <Footer />
  </BrowserRouter>,
  document.getElementById("app")
);
