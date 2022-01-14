import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

const ChartList = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then(response => {
        setCharts(response.data.nodes);
      });
    }
  }, []);

  return <>
    <ul>
      {charts.map(n => <li key={n.title}>
        <Link to={`/chart/${n._id}`} className="btn">{n.title}</Link></li>)}
    </ul>
    </>
};

export default ChartList;
