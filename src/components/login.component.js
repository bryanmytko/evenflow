import React, { useState } from 'react';
import App from '../App'

import AuthService from '../services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthService.login(email, password);
    window.location.reload();
  };

  return <form onSubmit={handleSubmit}>
    <label>Email:</label><input type="text" value={email}
      onChange={e => setEmail(e.target.value)} />
    <label>Password:</label><input type="password" value={password}
      onChange={e => setPassword(e.target.value)} />
    <input type="submit" value="Login" />
  </form>
};

export default Login;
