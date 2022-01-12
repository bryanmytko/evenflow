import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from './App';
import { Footer, Header } from './components';

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
