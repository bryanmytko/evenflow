import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './components/login.component';
import Nodes from './components/nodes.component';
import UserService from './services/user.service';

const BASE_URL = process.env.BASE_URL;

const App = () => {
  const [nodes, setNodes] = useState('');

  useEffect(async () => {
    try {
      UserService.getNodes().then((response) => {
        setNodes(response.data);
      });
    } catch (error) {
      setNodes(null);
    }
  }, []);

  if(nodes) {
    return <Nodes nodes={nodes} />
  } else {
    return <Login />
  }
};

export default App;
