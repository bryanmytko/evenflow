import React from 'react';
import { useState } from 'react';

import ChartCreateChild from './chartCreateChild';
import UserService from '../../services/user.service';

import './style.css';

const insertChildNode = (data, id, childNode) => {
  const iter = (a) => {
    if (a.id === id) {
      a.children ? a.children.push(childNode) : a.children = [childNode];
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }

  data.some(iter);
  return data;
};

const ChartCreate = () => {
  /* @TODO consider a reducer: ADD_CHILD, CREATE_PARENT, etc., */
  const [chartData, setChartData] = useState({});
  const [workingChild, setWorkingChild] = useState({ title: '', id: '' });
  const [parentId, setParentId] = useState('');
  const [parent, setParent] = useState({ title: '' });
  const [showForm, setShowForm] = useState(false);

  const addChildNode = () => {
    const newData = insertChildNode(chartData.nodes, parentId, workingChild);
    setChartData({ nodes: newData });
    setShowForm(false);
    setWorkingChild({ title: '' });
  };

  const initializeForm = (child) => {
    setShowForm(!showForm);
    setParentId(child.id);
  };

  const createParent = async () => {
    const response = await UserService.createNode({ title: parent.title });
    const { node } = response.data;
    const parentData = { title: parent.title, id: node._id, children: [] };

    setChartData({ nodes: [parentData]});
    setParent(parentData);
  };

  const returnChildren = (child) => {
    return <div key={child.id} className="create-node-unit">
      <label>{child.title}</label>
      <button className="btn" onClick={() => initializeForm(child)}>+</button>
      {(child.children || []).map((child, index) => returnChildren(child))}
    </div>
  }

  if(!parent.id){
    return <div className="chart-create-container container">
      <label>Chart Name:</label>
      <input value={parent.title} onChange={e => setParent({ title: e.target.value })} />
      <button className="btn" onClick={createParent}>Save</button>
    </div>;
  }

  return <div className="chart-create-container container">
    <div className="create-node-unit">
      <label className="title">{parent.title}</label>
      <button className="btn" onClick={() => initializeForm(parent)}>+</button>
      {(parent.children || []).map((child, index) => returnChildren(child))}

      <div className={`chart-create-control card green lighten-2 ${(showForm ? '' : 'hide')}`}>
        <input value={workingChild.title}
          onChange={e => setWorkingChild({ title: e.target.value, id: Math.floor(Math.random()*100) })} />
        <button className="btn" onClick={addChildNode}>SAVE</button>
      </div>
    </div>
  </div>;
};

export default ChartCreate;
