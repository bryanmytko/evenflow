import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import './style.css';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logout" element={<App />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('app'));
