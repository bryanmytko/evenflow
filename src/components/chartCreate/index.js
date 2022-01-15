import React from 'react';
import { useState } from 'react';

import { UserService, ObjectService } from '../../services';

import './style.css';

const ChartCreate = () => {
  /* @TODO consider a reducer: ADD_CHILD, CREATE_PARENT, etc., */
  const [chartData, setChartData] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [parentId, setParentId] = useState('');
  const [parent, setParent] = useState({ title: '' });
  const [showForm, setShowForm] = useState(false);

  const initializeForm = (node) => {
    setShowForm(!showForm);
    setParentId(node.id);
  };

  const createChild = async () => {
    const response = await UserService.createNode({ title: newTitle, parentId });
    const childData = { title: newTitle, id: response.data.node._id };
    const newData = ObjectService.insertChildNode(chartData.nodes, parentId, childData);

    setChartData({ nodes: newData });
    setShowForm(false);
    setNewTitle('');
  };

  const createParent = async () => {
    const response = await UserService.createNode({ title: parent.title });
    const { node } = response.data;
    const parentData = { title: parent.title, id: node._id, children: [] };

    setChartData({ nodes: [parentData]});
    setParent(parentData);
  };

  const showChildren = (child, index) => {
    return <li key={index}>
      <span>{child.title}
        <button className="btn" onClick={() => initializeForm(child)}>+</button>
      </span>
      <ul>
      {(child.children || []).map((child, index) => showChildren(child, index))}
      </ul>
    </li>;
  }

  const showContent = () => {
    if(!parent.id){
      return <div className="chart-create-form card">
        <label>Chart Name:</label>
        <input value={parent.title} onChange={e => setParent({ title: e.target.value })} />
        <button className="btn" onClick={createParent}>Save</button>
      </div>;
    }

    return <>
      <h5>{parent.title}
        <button className="btn" onClick={() => initializeForm(parent)}>+</button>
      </h5>
      <ul className="wtree">
        {(parent.children || []).map((child, index) => showChildren(child, index))}
      </ul>
      <div className={`chart-create-form card ${(showForm ? '' : 'hide')}`}>
        <input value={newTitle}
          onChange={e => setNewTitle(e.target.value)} />
        <button className="btn" onClick={createChild}>Save</button>
      </div>
    </>;
  }

  return <div className="chart-create-container container">
    {showContent()}
  </div>;
};

export default ChartCreate;
