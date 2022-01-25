import React from 'react';

import './style.css';

const Breadcrumbs = (props) => {
  return <div className="breadcrumbs">
    <ul>
      { props.breadcrumbs.map((breadcrumb, i) => {
        return <li key={i}>
          <button onClick={
            () => props.follow({
              ...breadcrumb,
              direction: 'backward' })}>
            {breadcrumb.title}
          </button>
        </li>;
      })}
    </ul>
  </div>;
};

export default Breadcrumbs;
