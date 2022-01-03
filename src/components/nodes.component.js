import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const Nodes = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(async () => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then((response) => {
        setNodes(response.data.nodes);
      });
    }
  }, []);

  function follow(id){
    if(AuthService.currentUser()) {
      UserService.getNodeChildren(id).then((response) => {
        // prevState.current = nodes;
        console.log('getting kids:', response.data)
        setNodes(response.data.nodes);
      });
    }
  }

  /* @TODO refactor this mess */
  if(nodes.length && !nodes[0].parent){
    return <>
      <ul>
        {nodes.map(n => {
          if(!n.children || !n.children.length) return;
          return <li key={n.title}><input className="btn" type="button" value={n.title} onClick={() => follow(n._id)} /></li>
        })}
      </ul>
    </>
  } else if(nodes.length === 1 && nodes[0].children.length === 0) {
    return <p>{nodes[0].payload}</p>
  } else {
    return <>
      <ul>
        {nodes.map(n => {
          if(!n.children || !n.children.length) return;
          return <li key={n.title}><input className="btn" type="button" value={n.title} onClick={() => follow(n._id)} /></li>
        })}
      </ul>
    </>
  }
};

export default Nodes;
