import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const App = () => {
  const [post, setPost] = React.useState(null);

  React.useEffect(async () => {
    const res = await axios.get(`${BASE_URL}/api/node`);
    setPost(res.data);
  }, []);
  return <h1>Hello Universe {post}</h1>;
};

ReactDOM.render(<App />, document.getElementById('app'));
