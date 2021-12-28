import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../services/auth.service';

const Nodes = (props) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(props.nodes.nodes);
  });

  if(nodes) {
    return <>
      <h1>Nodes</h1>
      <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
      <ul>
        {nodes.map(n => (<li><input type="button" key={n.title} value={n.title} /></li>))}
      </ul>
    </>
  } else {
    return <h1>Children</h1>
  }
};

export default Nodes;
