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

  const showCharts = () => {
    return <ul>
      {charts.map(n => <li key={n._id}>
        <Link to={`/chart/${n._id}`} className="btn btn-large">{n.title}</Link></li>)}
    </ul>;
  };

  return <>
    { charts.length ? showCharts() : <em>You don't seem to have any charts yet.</em> }
  </>;
};

export default ChartList;
