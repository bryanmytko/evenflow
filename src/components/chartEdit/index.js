import React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChartCreateForm,Logo } from '../';
import { UserService } from '../../services';
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

const ChartEdit = () => {
  const [tree, setTree] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 200 });
  const [state, dispatch] = useReducer(NewChildFormReducer, initialState);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    UserService.getNodeChildren(id).then(response => {
      setTree(response.data.nodes);
    })
  }, [id]);

  const updateChild = async () => {
    const { title, payload } = state.formData;
    const { parentId } = state;
    const response = await UserService.createNode({ title, payload, parentId });
    const childData = { title, payload, id: response.data.node._id };

    // ObjectService.insertChildNode([tree], parentId, childData);
    dispatch({ type: 'HIDDEN' });
  };

  const toggleModal = (e, child) => {
    console.log(child.title)
    setPosition({ x: e.pageX, y: e.pageY });
    dispatch({
      type: 'EDIT_CHILD',
      parentId: child.id,
      formData: { title: child.title, payload: child.payload }
    });
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

  const viewTree = () => {
    return <>
      <h5>{tree.title}</h5>
      <ul className="wtree">
        {(tree.children || []).map((child, index) => showChildren(child, index))}
      </ul>
      <ChartCreateForm
        position={position}
        action={updateChild}
        dispatch={dispatch}
        state={state}
      />
    </>;
  }

  return <div className="node-card">
    <Logo />
    {viewTree()}
  </div>;
};

export default ChartEdit;
