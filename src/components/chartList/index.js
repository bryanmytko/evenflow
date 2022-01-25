import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

import './style.css';

const ChartList = () => {
  const [charts, setCharts] = useState([]);
  const [message, setMessage] = useState('It seems you haven\'t created any charts yet.');
  const [privateChanged, setPrivateChanged] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('breadcrumbs', JSON.stringify([]));

    if(AuthService.currentUser()) {
      UserService.getNodes().then(response => {
        setCharts(response.data.nodes);
      }).catch(err => {
        setCharts({});
        setMessage('Something went wrong. Could not load data.');
      });
    }
  }, [privateChanged]);

  const deleteNode = async (node, index) => {
    await UserService.deleteNode(node);
    setCharts(charts.filter((_, i) => i !== index));
  };

  const markPrivate = async e => {
    setPrivateChanged(e.target.value);
    const response = await UserService.updatePrivate(e.target.id);
    setPrivateChanged(response.data.node.private);
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
          <th>Private?</th>
        </tr>
      </thead>
      <tbody>
        {charts.map((n, index) => <tr key={index}>
          <td>{n.title}</td>
          <td>
            <Link to={`/chart/${n.slug}`} className="btn">
              View Tree
            </Link>
          </td>
          <td>
            <Link
              to="/"
              onClick={e => copyToClipboard(e)}
              name={n.slug}
              className="btn">
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
          <td>
            <label>
              <input
                className="white"
                type="checkbox"
                checked={!!n.private}
                value={n.private}
                id={n._id}
                onChange={e => markPrivate(e)}
              />
              <span></span>
            </label>
          </td>
        </tr>)}
      </tbody>
    </table>;
  };

  return <>
    { charts.length ? showCharts() : <em>{message}</em> }
  </>;
};

export default ChartList;
