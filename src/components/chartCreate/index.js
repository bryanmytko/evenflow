import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../';
import { UserService } from '../../services';

import './style.css';

const ChartCreate = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const createTreeRoot = async () => {
    const response = await UserService.createNode({ title, payload: '' });
    const { node } = response.data;
    navigate(`/chart/edit/${node._id}`);
  };

  return <div className="node-card">
    <Logo />
    <div className="chart-create-form card chart-create-initialize">
      <label>Chart Name:</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button className="btn" onClick={createTreeRoot}>Save</button>
    </div>
  </div>;
};

export default ChartCreate;
