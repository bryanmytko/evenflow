import React from 'react';
import { Link } from 'react-router-dom';

import Nodes from './nodes.component';

const Home = () => {
  return <div className="container">
    <div className="row padding-20">
      <div className="card node-card col s8 offset-s2">
        <h5>Charts</h5>
        <Nodes />
      </div>
      <div className="card node-card col s8 offset-s2">
        <h5>Add Chart</h5>
        <p>
          <Link to="/createNode" className="btn">Create</Link>
        </p>
      </div>
    </div>
  </div>
};

export default Home;
