import React, { useState} from 'react';

import UserService from '../../../services/user.service';

const ChartCreateChild = (props) => {

  return <div>
    <h5>{props.parent.title}</h5>
    <input placeholder="Child Title" value={props.workingChild.title}
      onChange={e => props.setWorkingChild({ title: e.target.value, parentId: props.parent._id }) } />
    <button className="btn" onClick={props.createChild}>Add Child</button>
  </div>
};

export default ChartCreateChild;
