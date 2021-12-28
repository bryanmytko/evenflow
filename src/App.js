import React, { useState, useEffect } from 'react';

import Login from './components/login.component';
import Nodes from './components/nodes.component';
import UserService from './services/user.service';
import AuthService from './services/auth.service';

const App = () => {
  const [nodes, setNodes] = useState('');

  useEffect(async () => {
    if(AuthService.currentUser()) {
      UserService.getNodes().then((response) => {
        setNodes(response.data);
      });
    }
  }, []);

  if(nodes) {
    return <Nodes nodes={nodes} />
  } else {
    return <Login />
  }
};

export default App;
