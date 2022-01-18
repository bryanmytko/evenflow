import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

import './style.css';

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
    return <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>View</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {charts.map(n => <tr key={n._id}>
          <td>{n.title}</td>
          <td><Link to={`/chart/${n._id}`} className="btn">Chart</Link></td>
          <td><Link to={`/chart/edit/${n._id}`}>Edit</Link></td>
        </tr>)}
      </tbody>
    </table>;
  };

  return <>
    { charts.length ? showCharts() : <em>You don't seem to have any charts yet.</em> }
  </>;
};

export default ChartList;
