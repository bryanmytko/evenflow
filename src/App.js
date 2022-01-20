import React from 'react';
import ReactGA from 'react-ga';
import { Outlet } from 'react-router-dom';

import { Footer } from './components';

ReactGA.initialize(process.env.REACT_APP_GA);

const App = () => {
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
