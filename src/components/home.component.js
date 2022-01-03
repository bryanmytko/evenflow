import React from 'react';

import Nodes from './nodes.component';

const Home = () => {
  return <div className="container">
    <div className="row padding-20">
      <div className="card node-card col s8 offset-s2">
        <Nodes />
      </div>
    </div>
  </div>
};

export default Home;
