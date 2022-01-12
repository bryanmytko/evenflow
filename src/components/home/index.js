import React from 'react';
import { Link } from 'react-router-dom';

import { ChartCreate, ChartList } from '../';

const Home = () => {
  return <div className="container">
    <div className="row padding-20">
      <div className="card node-card col s8 offset-s2">
        <h5>Charts</h5>
        <ChartList />
      </div>
      <div className="card node-card col s8 offset-s2">
        <h5>Add Chart</h5>
        <p>
          <Link to="/chart/create" className="btn">Create</Link>
        </p>
      </div>
    </div>
  </div>
};

export default Home;
