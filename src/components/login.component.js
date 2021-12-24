import React from 'react';

import AuthService from '../services/auth.service';

const Login = () => {
  return <form>
    <label>Email:</label><input name="email" />
    <label>Password:</label><input name="password" />
    <input type="submit" text="Login" />
  </form>
};

export default Login;
