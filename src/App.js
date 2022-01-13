import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header} from './components';

const App = () => {
  return <>
    <Header />
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>;
};


export default App;
