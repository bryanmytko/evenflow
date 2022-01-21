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
    _id: '',
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

  const putChild = async () => {
    const { _id, title, payload } = state.formData;
    const { parentId } = state;
    let updatedTree;

    if(_id){
      await UserService.updateNode({ id: _id, title, payload });
      const childData = { title, payload };
      updatedTree = ObjectService.replaceChildNode(tree, _id, childData);
    } else {
      const response = await UserService.createNode({ title, payload, parentId });
      const childData = { title, payload, _id: response.data.node._id };
      updatedTree = ObjectService.insertChildNode(tree, parentId, childData);
    }

    setTree(updatedTree);
    dispatch({ type: 'HIDDEN' });
  };

  const deleteNode = async child => {
    await UserService.deleteNode(child._id);

    const updatedTree = ObjectService.removeChildNode(tree, child._id);
    setTree(updatedTree);
  };

  const toggleCreateModal = (e, node) => {
    setPosition({ x: e.pageX, y: e.pageY });
    dispatch({
      type: 'NEW_CHILD',
      parentId: node._id
    });
  }

  const toggleEditModal = (e, node) => {
    setPosition({ x: e.pageX, y: e.pageY });
    dispatch({
      type: 'EDIT_CHILD',
      parentId: node._id,
      formData: {
        id: node._id,
        title: node.title,
        payload: node.payload
      }
    });
  }

  const showChildren = (child, index) => {
    return <li key={index}>
      <span>
        <div className="node-title">{child.title}</div>
        <button className={`btn material-icons ${child.payload ? 'hide' : ''}`}
          id={`button-${index}`}
          onClick={(e) => toggleCreateModal(e, child)}>add</button>
        <button className="btn material-icons"
          id={`button-${index}`}
          onClick={e => toggleEditModal(e, child)}>edit</button>
        <button className="btn btn-new material-icons"
          onClick={e => deleteNode(child)}>delete</button>
        <Expandable content={child.payload} />
      </span>
      <ul>
        {(child.children || [])
          .map((child, index) => showChildren(child, index))}
      </ul>
    </li>;
  };

  return <div className="node-card">
    <Logo />
    <h5>
      <div className="node-title">{tree.title}</div>
      <button className="btn material-icons"
        onClick={e => toggleCreateModal(e, tree)}>add</button>
      <button className="btn material-icons"
        onClick={e => toggleEditModal(e, tree)}>edit</button>
    </h5>
    <ul className="wtree">
      {(tree.children || [])
        .map((child, index) => showChildren(child, index))}
    </ul>
    <ChartCreateForm
      position={position}
      dispatch={dispatch}
      state={state}
      action={putChild}
    />
  </div>;
};

export default ChartEdit;
