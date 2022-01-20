import React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChartCreateForm, Expandable, Logo } from '../';
import { ObjectService, UserService } from '../../services';
import { NewChildFormReducer } from '../../reducers';

import './style.css';

const initialState = {
  hidden: true,
  terminating: false,
  parentId: '',
  formData: {
    id: '',
    title: '',
    payload: ''
  }
};

const ChartEdit = () => {
  const [tree, setTree] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 200 });
  const [state, dispatch] = useReducer(NewChildFormReducer, initialState);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    UserService.getNodeChildren(id).then(response => {
      setTree(response.data.nodes);
    })
  }, [id]);

  const editChild = async () => {
    const { id, title, payload } = state.formData;
    await UserService.updateNode({ id, title, payload });
    const childData = { title, payload };

    const updatedTree = ObjectService.replaceChildNode(tree, id, childData);
    setTree(updatedTree);
    dispatch({ type: 'HIDDEN' });
  };

  const deleteNode = async child => {
    await UserService.deleteNode(child._id);

    const updatedTree = ObjectService.removeChildNode(tree, child._id);
    setTree(updatedTree);
  };

  const toggleModal = (e, child) => {
    setPosition({ x: e.pageX, y: e.pageY });
    dispatch({
      type: 'EDIT_CHILD',
      parentId: child.id,
      formData: { id: child._id, title: child.title, payload: child.payload }
    });
  }

  const showChildren = (child, index) => {
    return <li key={index}>
      <span>{child.title}
        <button className="btn material-icons"
          id={`button-${index}`}
          onClick={e => toggleModal(e, child)}>edit</button>
        <button className="btn btn-new material-icons"
          onClick={e => deleteNode(child)}>delete</button>
        <Expandable content={child.payload} />
      </span>
      <ul>
        {(child.children || []).map((child, index) => showChildren(child, index))}
      </ul>
    </li>;
  };

  const viewTree = () => {
    return <>
      <h5>
        {tree.title}
        <button className="btn material-icons" onClick={e => toggleModal(e, tree)}>edit</button>
      </h5>
      <ul className="wtree">
        {(tree.children || []).map((child, index) => showChildren(child, index))}
      </ul>
      <ChartCreateForm
        position={position}
        action={editChild}
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
