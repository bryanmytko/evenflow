import React, { useState} from 'react';

import UserService from '../../../services/user.service';

const ChartCreateChild = (props) => {
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState(false);
  const [childId, setChildId] = useState('');

  const createChild = async () => {
    const response = await UserService.createNode({ title, parentId: props.parent.id });
    setChildId(response.data.node._id);
    setCreated(true);
  }

  const addChildForm = () => {
    props.setParent({...props.parent, id: childId});
    props.addChildForm();
  }

  if(created) {
    return <>
      <p>{title}</p>
      <button className="btn"
        onClick={addChildForm}>Add Child</button>
    </>;
  }

  return <>
    <input onChange={e => setTitle(e.target.value)} />
    <button className="btn" onClick={createChild}>Add</button>
  </>;
};

export default ChartCreateChild;
