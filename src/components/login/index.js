import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import AuthService from '../../services/auth.service';

import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* @TODO need a way to do error handling */
    await AuthService.login(email, password);
    return navigate('/', { replace: true });
  };

    return <div className="container main-container">
      <div className="row">
        <div className="col s12">
            <p>treeflow.</p>
          <div className="card-panel login-panel">
            <div className="row no-margin-bottom">
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
