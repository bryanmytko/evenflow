import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';

import { Footer } from './components';
import AnalyticsService from './services/analytics.service';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

<Grid color="#00BFFF" height={80} width={80} />

const App = () => {
  AnalyticsService();

  return <>
    <main>
      <div className="main-container container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>;
};


export default App;
