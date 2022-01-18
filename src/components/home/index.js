import React from 'react';
import { Link } from 'react-router-dom';

import { ChartList } from '../';

import './style.css';

const Home = () => {
  return <div className="node-card">
    <a href="/">
      <div className="logo"></div>
    </a>
    <h5>My Charts</h5>
    <div className="card node-card col s8 offset-s2">
      <ChartList />
    </div>
    <p>
      <Link to="/chart/create" className="btn btn-new">+ Create New Chart</Link>
      &nbsp; 
      <Link to="/logout" className="btn btn-new">Logout</Link>
    </p>
  </div>;
};

export default Home;
