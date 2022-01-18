import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Logo } from '../';
import AuthService from '../../services/auth.service';

import './style.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* @TODO need a way to do error handling */
    await AuthService.signup(email, password);
    return navigate('/', { replace: true });
  };

  return <div className="container main-container valign-wrapper">
    <div className="row valign-wrapper">
      <div className="col s12">
        <Logo />
        <div className="card-panel signup-panel">
          <div className="row no-margin-bottom">
            <form className="login" onSubmit={handleSubmit}>
            <div className="field">
              <label>Your Email:</label><input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Enter a Password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="actions">
              <div className="card-action right-align">
               <input type="submit" value="Signup" className="btn" />
               <p><Link to="/login">Log in?</Link></p>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Signup;