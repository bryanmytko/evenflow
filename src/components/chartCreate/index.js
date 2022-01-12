import React from 'react';
import { useState } from 'react';

import UserService from '../../services/user.service';

const ChartCreate = () => {
  const [title, setTitle] = useState('');

  const createChart = () => {
    UserService.createNode({ title });
    // @TODO update UI with success / error
  }

  return <div className="container col s8 offset-s2">
    <h5>Create Chart</h5>
    <input placeholder="Title"
      value={title}
      onChange={e => setTitle(e.target.value)} />
    <button className="btn"
      onClick={createChart}>Save</button>
  </div>
};

export default ChartCreate;
