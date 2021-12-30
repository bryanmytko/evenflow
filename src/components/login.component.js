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

    return <div className="container main-container">
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <div className="logo"></div>
          <div className="card-panel">
            <div className="row no-margin-bottom">
              <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email:</label><input type="text" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="actions">
                <div className="card-action right-align">
                 <input type="submit" value="Login" />
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
