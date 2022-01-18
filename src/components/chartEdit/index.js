import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Logo } from '../';
import { UserService } from '../../services';

const ChartEdit = () => {
  const [tree, setTree] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    UserService.getNodeChildren(id).then(response => {
      setTree(response.data.nodes);
    })
  }, [id]);

  const showChildren = (child, index) => {
    return <li key={index}>
      <span>{child.title}
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
    </>;
  }

  return <div className="node-card">
    <Logo />
    {viewTree()}
  </div>;
};

export default ChartEdit;
