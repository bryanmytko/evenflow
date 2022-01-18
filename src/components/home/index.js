import React from 'react';
import { Link } from 'react-router-dom';

import { ChartList, Logo } from '../';
import AuthService from '../../services/auth.service';

import './style.css';

const Home = () => {
  return <div className="node-card">
    <Logo />
    <h5>My Charts</h5>
    <div className="card node-card col s8 offset-s2">
      <ChartList />
    </div>
    <p>
      <Link to="/chart/create" className="btn btn-new">+ Create New Chart</Link>
      &nbsp;
      <Link to="/" onClick={AuthService.logout} className="btn btn-new">Logout</Link>
    </p>
  </div>;
};

export default Home;
