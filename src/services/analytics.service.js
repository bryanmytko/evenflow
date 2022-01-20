import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-217723206-1');

const AnalyticsService = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname + location.search);
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default AnalyticsService;
