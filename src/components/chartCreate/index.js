import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Error, Logo } from '../';
import { AuthService, UserService, ValidationService } from '../../services';

import './style.css';

const ChartCreate = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createTreeRoot = async () => {
    const validTitle = ValidationService.blank(title);
    if(!validTitle.valid) return setError(validTitle.msg);

    try {
      const response = await UserService.createNode({ title, payload: '' });
      const { node } = response.data;

      navigate(`/chart/edit/${node._id}`);
    } catch(err) {
      AuthService.logout();
    }
  };

  return <div className="node-card">
    <Logo />
    <div className="chart-create-form card chart-create-initialize">
      <Error error={error} />
      <label>Chart Name:</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button className="btn" onClick={createTreeRoot}>Save</button>
    </div>
  </div>;
};

export default ChartCreate;
