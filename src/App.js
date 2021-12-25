import React, { useState } from 'react';
import axios from 'axios';

import Login from './components/login.component';

const BASE_URL = process.env.BASE_URL;

const App = () => {
  const [post, setPost] = useState(null);

  React.useEffect(async () => {
    try {
      // const res = await axios.get(`${BASE_URL}/api/node`);
      // setPost(res.data);
    } catch (error) {
      // console.log('Error:', error);
    }
  }, []);

  return <Login />
};

export default App;
