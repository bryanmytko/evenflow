import React from 'react';
import { useReducer, useState } from 'react';

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
  const [state, dispatch] = useReducer(NewChildFormReducer, initialState);

  const createChild = async () => {
    const response = await UserService
      .createNode({ title: state.title, parentId: state.parentId });
    const childData = { title: state.title, id: response.data.node._id };
    ObjectService.insertChildNode([tree], state.parentId, childData);

    dispatch({ type: 'HIDDEN' });
  };

  const createTerminatingChild = async () => {
    console.log('create a terminating child');
    console.log(state.formData);
    // Save via API
    // Remove + button from parent node
    // Reset state
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
          <input type="checkbox" className="white" onClick={
            () => dispatch(state.terminating ? { type: 'NEW_CHILD' } : { type: 'TERMINATING' })
          } />
          <span>Terminating node?</span>
        </label>
        <input value={state.formData.title}
          placeholder="Title"
          onChange={e => dispatch({
            type: 'VALUE_CHANGE',
            formData: { title: e.target.value }
          })} />
        <div className={ state.terminating ? 'hide' : '' }>
          <button className="btn" onClick={createChild}>Save Node</button>
        </div>
        <div className={ state.terminating ? '' : 'hide' }>
          <textarea value={state.formData.payload} onChange={
            e => dispatch({ type: 'VALUE_CHANGE', formData: { payload: e.target.value }})}>
          </textarea>
          <button className="btn" onClick={createTerminatingChild}>Save Node</button>
        </div>
      </div>
    </>;
  }

  return <div className="chart-create-container container">
    {showContent()}
  </div>;
};

export default ChartCreate;
