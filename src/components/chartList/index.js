import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

import './style.css';

const ChartList = () => {
  const [charts, setCharts] = useState([]);
  // const alert = useAlert();

  useEffect(() => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then(response => {
        setCharts(response.data.nodes);
      });
    }
  }, []);

  const deleteNode = async (node, index) => {
    await UserService.deleteNode(node);
    setCharts(charts.filter((_, i) => i !== index));
  };

  const copyToClipboard = e => {
    e.preventDefault();
    const uri = `${window.location.href}chart/${e.target.name}`;
    navigator.clipboard.writeText(uri);
  };

  const showCharts = () => {
    return <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>View</th>
          <th>Share</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {charts.map((n, index) => <tr key={index}>
          <td>{n.title}</td>
          <td><Link to={`/chart/${n.slug}`} className="btn">View Tree</Link></td>
          <td>
            <Link
              to="/"
              onClick={e => copyToClipboard(e)}
              name={n.slug}
              className="btn green darken-3">
              copy link
            </Link>
          </td>
          <td>
            <Link to={`/chart/edit/${n._id}`} className="btn material-icons">
              edit
            </Link>
            &nbsp;
            <button className="btn btn-new material-icons" name={n._id}
              onClick={e => deleteNode(e.target.name, index)}>
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
