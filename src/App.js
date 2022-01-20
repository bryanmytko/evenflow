import React from 'react';
import ReactGA from 'react-ga';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from './components';

ReactGA.initialize('UA-217723206-1');

const usePageViews = () => {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
}

const App = () => {
  usePageViews();
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
