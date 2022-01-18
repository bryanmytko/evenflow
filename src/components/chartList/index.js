import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

import './style.css';

const ChartList = () => {
  const [charts, setCharts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then(response => {
        setCharts(response.data.nodes);
      });
    }
  }, []);

  const deleteNode = async (n) => {
    await UserService.deleteNode(n);
    return navigate(0);
  };

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
          <td><Link to={`/chart/${n._id}`} className="btn">View Tree</Link></td>
          <td>
            <Link to={`/chart/edit/${n._id}`} className="btn material-icons">
              edit
            </Link>
            &nbsp;
            <button className="btn btn-new material-icons" name={n._id} onClick={e => deleteNode(e.target.name)}>
              delete
            </button>
          </td>
        </tr>)}
      </tbody>
    </table>;
  };

  return <>
    { charts.length ? showCharts() : <em>You don't seem to have any charts yet.</em> }
  </>;
};

export default ChartList;
