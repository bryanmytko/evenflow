import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './components';

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
