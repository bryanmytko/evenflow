import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Error, Logo } from '../';
import AuthService from '../../services/auth.service';

import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await AuthService.login(email, password);
    
    if(response.error) return setError('Invalid Email/Password.');
    return navigate('/', { replace: true });
  };

  return <div className="container main-container valign-wrapper">
    <div className="row valign-wrapper">
      <div className="col s12">
        <Logo />
        <div className="card-panel login-panel">
          <div className="row no-margin-bottom">
            <Error error={error} />
            <form className="login" onSubmit={handleSubmit}>
            <div className="field">
              <label>Email:</label><input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="actions">
              <div className="card-action right-align">
               <input type="submit" value="Login" className="btn" />
               <p><Link to="/signup">Sign up?</Link></p>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Login;
