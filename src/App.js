import React from 'react';

import Login from './components/login.component';

const BASE_URL = process.env.BASE_URL;

const App = () => {
  const [post, setPost] = React.useState(null);

  React.useEffect(async () => {
    const res = await axios.get(`${BASE_URL}/api/node`);
    setPost(res.data);
  }, []);

  return <Login />
};

export default App;
