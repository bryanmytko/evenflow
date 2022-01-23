import React from 'react';

import './style.css';

const Error = (props) => {
  return <div className={`error ${props.error ? '' : 'hide'}`}>{props.error}</div>
};

export default Error;
