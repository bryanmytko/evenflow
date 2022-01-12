import React, { useEffect, useState } from 'react';

import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

const ChartList = () => {
  const [charts, setCharts] = useState([]);

  useEffect(async () => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then(response => {
        setCharts(response.data.nodes);
      });
    }
  });

  return <>
    <ul>
      {charts.map(n => <li key={n.title}><button className="btn">{n.title}</button></li>)}
    </ul>
    </>

};

export default ChartList;
