import React from 'react';
import { useReducer, useState } from 'react';

import { UserService, ObjectService } from '../../services';
import { NewChildFormReducer } from '../../reducers';

import './style.css';

const initialState = {
  hidden: true,
  terminating: false,
  parentId: '',
  title: '',
};

const ChartCreate = () => {
  const [tree, setTree] = useState({ title: '' });
  const [state, dispatch] = useReducer(NewChildFormReducer, initialState);

  const createChild = async () => {
    const response = await UserService
      .createNode({ title: state.title, parentId: state.parentId });
    const childData = { title: state.title, id: response.data.node._id };
    ObjectService.insertChildNode([tree], state.parentId, childData);

    dispatch({ type: 'HIDDEN' });
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
        <button className="btn" onClick={
          () => dispatch({ type: 'NEW_CHILD', parentId: child.id })}>+</button>
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
        <button className="btn" onClick={
          () => dispatch({ type: 'NEW_CHILD', parentId: tree.id })}>+</button>
      </h5>
      <ul className="wtree">
        {(tree.children || []).map((child, index) => showChildren(child, index))}
      </ul>
      <div className={`chart-create-form card ${(state.hidden ? 'hide' : '')}`}>
        <label>
          <input type="checkbox" className="white" />
          <span>Terminating node?</span>
        </label>
        <input value={state.title}
          onChange={e => dispatch({
            type: 'VALUE_CHANGE',
            title: e.target.value
          })} />
        <button className="btn" onClick={createChild}>Save Child</button>
        <textarea></textarea>
        <button className="btn" onClick={createChild}>Save Payload</button>
      </div>
    </>;
  }

  return <div className="chart-create-container container">
    {showContent()}
  </div>;
};

export default ChartCreate;
