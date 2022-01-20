import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './components';
import AnalyticsService from './services/analytics.service';

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
