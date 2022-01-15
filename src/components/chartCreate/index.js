import React from 'react';
import { useState } from 'react';

import { UserService, ObjectService } from '../../services';

import './style.css';

const ChartCreate = () => {
  const [tree, setTree] = useState({ title: '' });
  const [newTitle, setNewTitle] = useState('');
  const [newNodeParentId, setNewNodeParentId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const initializeForm = (node) => {
    setShowForm(!showForm);
    setNewNodeParentId(node.id);
  };

  const createChild = async () => {
    const response = await UserService.createNode({ title: newTitle, parentId: newNodeParentId });
    const childData = { title: newTitle, id: response.data.node._id };
    const newData = ObjectService.insertChildNode([tree], newNodeParentId, childData);

    setShowForm(false);
    setNewTitle('');
  };

  const createTreeRoot = async () => {
    const response = await UserService.createNode({ title: tree.title });
    const { node } = response.data;
    const data = { title: tree.title, id: node._id, children: [] };

    setTree(data);
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
    if(!tree.id){
      return <div className="chart-create-form card">
        <label>Chart Name:</label>
        <input value={tree.title} onChange={e => setTree({ title: e.target.value })} />
        <button className="btn" onClick={createTreeRoot}>Save</button>
      </div>;
    }

    return <>
      <h5>{tree.title}
        <button className="btn" onClick={() => initializeForm(tree)}>+</button>
      </h5>
      <ul className="wtree">
        {(tree.children || []).map((child, index) => showChildren(child, index))}
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
