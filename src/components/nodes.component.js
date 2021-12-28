import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const Nodes = (props) => {
  const [nodes, setNodes] = useState(props.nodes.nodes);

  function follow(id){
    if(AuthService.currentUser()) {
      UserService.getNode(id).then((response) => {
        console.log('new data', response.data)
        setNodes(response.data.children);
      });
    }
  }

  if(!nodes[0].parent){
    console.log(nodes[0])
    return <>
      <h1>Nodes</h1>
      <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
      <ul>
        {nodes.map(n => (<li key={n.title}><input type="button" value={n.title} onClick={() => follow(n._id)} /></li>))}
      </ul>
    </>
  } else {
    return <h1>Children</h1>
  }
};

export default Nodes;
