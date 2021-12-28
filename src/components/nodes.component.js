import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../services/auth.service';

const Nodes = (props) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(props.nodes.nodes);
  });

  return <>
    <h1>Nodes</h1>
    <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
    <ul>
      {nodes.map(n => (<li key={n.title}>{n.title}</li>))}
    </ul>;
  </>
};

export default Nodes;
