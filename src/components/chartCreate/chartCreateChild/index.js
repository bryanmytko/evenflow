import React, { useState} from 'react';

import UserService from '../../../services/user.service';

const ChartCreateChild = (props) => {
  const nestedNodes = (props.parent.children || []).map((child, index) => {
    return <p key={index}>{child.title}</p>;
  });

  return <div>
    <h5>{props.parent.title}</h5>
    <input placeholder="Child Title" value={props.workingChild.title}
    onChange={e => props.setWorkingChild({ title: e.target.value, parentId: props.parent._id }) } />
    <button className="btn" onClick={props.createChild}>Add Child</button>
    {nestedNodes}
  </div>
};

export default ChartCreateChild;
