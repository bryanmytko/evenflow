import React, { useEffect, useState } from 'react';

const Nodes = (props) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(props.nodes.nodes);
  });

  return <>
    <h1>Nodes</h1>
    <ul>
      {nodes.map(n => (<li key={n.id}>{n.title}</li>))} 
    </ul>;
  </>
};

export default Nodes;
