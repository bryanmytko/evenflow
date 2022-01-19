import React from 'react';
import { useReducer, useState } from 'react';

import { ChartCreateForm, Logo } from '../';
import { UserService, ObjectService } from '../../services';
import { NewChildFormReducer } from '../../reducers';

import './style.css';

const initialState = {
  hidden: true,
  terminating: false,
  parentId: '',
  formData: {
    title: '',
    payload: ''
  }
};

const ChartCreate = () => {
  const [tree, setTree] = useState({ title: '' });
  const [position, setPosition] = useState({ x: 0, y: 200 });
  const [state, dispatch] = useReducer(NewChildFormReducer, initialState);

  const createChild = async () => {
    const { title, payload } = state.formData;
    const { parentId } = state;
    const response = await UserService.createNode({ title, payload, parentId });
    const childData = { title, payload, id: response.data.node._id };

    ObjectService.insertChildNode([tree], parentId, childData);
    dispatch({ type: 'HIDDEN' });
  };

  const createTreeRoot = async () => {
    const response = await UserService.createNode({ title: tree.title });
    const { node } = response.data;
    const data = { title: tree.title, id: node._id, children: [] };

    setTree(data);
  };

  const toggleModal = (e, child) => {
    setPosition({ x: e.pageX, y: e.pageY });
    dispatch({ type: 'NEW_CHILD', parentId: child.id });
  }

  const showChildren = (child, index) => {
    return <li key={index}>
      <span>{child.title}
      <button className={`btn ${child.payload ? 'hide' : ''}`}
        id={`button-${index}`}
        onClick={(e) => toggleModal(e, child)}>+</button>
        <span className="payload">{child.payload}</span>
      </span>
      <ul>
        {(child.children || []).map((child, index) => showChildren(child, index))}
      </ul>
    </li>;
  };

  const showContent = () => {
    if(!tree.id){
      return <div className="chart-create-form card chart-create-initialize">
        <label>Chart Name:</label>
        <input value={tree.title} onChange={e => setTree({ title: e.target.value })} />
        <button className="btn" onClick={createTreeRoot}>Save</button>
      </div>;
    }

    return <>
      <h5>{tree.title}
        <button className="btn" onClick={(e) => toggleModal(e, tree)}>+</button>
      </h5>
      <ul className="wtree">
        {(tree.children || []).map((child, index) => showChildren(child, index))}
      </ul>
      <ChartCreateForm
        action={createChild}
        dispatch={dispatch}
        state={state}
        position={position}
      />
    </>;
  }

  return <div className="node-card">
    <Logo />
    {showContent()}
  </div>;
};

export default ChartCreate;
