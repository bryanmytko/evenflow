import React from 'react';
import { useState } from 'react';

import ChartCreateChild from './chartCreateChild';
import UserService from '../../services/user.service';

import './style.css';

const ChartCreate = () => {
  const [title, setTitle] = useState('');
  const [parentCreated, setParentCreated] = useState(false);
  const [chartData, setChartData] = useState({ nodes: [] });
  const [workingChild, setWorkingChild] = useState({ title: '' });

  const createParent = async () => {
    /* @TODO Error handling */
    const response = await UserService.createNode({ title });
    const { node: parent } = response.data;

    setChartData({ nodes: [...chartData.nodes, parent] });
    setParentCreated(true);
  };

  const createChild = async () => {
    const response = await UserService.createNode({
      title: workingChild.title,
      parentId: workingChild.parentId
    });
    const { node: childNode } = response.data;

    setChartData({ nodes: [...chartData.nodes, childNode] });
  };

  if(parentCreated) {
    return <>
      { chartData.nodes.map(node => <ChartCreateChild key={node._id}
        parent={node}
        workingChild={workingChild}
        setWorkingChild={setWorkingChild}
        createChild={createChild} />) }
    </>;
  }

  return <div style={{marginLeft: "30px"}}>
    <input placeholder="Title"
      value={title}
      onChange={e => setTitle(e.target.value)} />
    <button className="btn"
      onClick={createParent}>Save</button>
  </div>;
};

  // const [parent, setParent] = useState({ title: '', id: '', saved: false });
  // const [children, setChildren] = useState([]);
  //
  // const createChart = async () => {
  //   const response = await UserService.createNode({ title: parent.title });
  //   setParent({ ...parent, id: response.data.node._id, saved: true });
  // }
  //
  // const addChildForm = () => {
  //   setChildren([...children, children.length + 1]);
  // }
  //
  // return <div className="chart-create-container container">
  //   <div className="row">
  //     <div className="col s8 offset-s2">
  //       <h5>Create Chart</h5>
  //
  //       <p className={parent.saved ? '' : 'hide'}>{parent.title}</p>
  //
  //       <input placeholder="Title"
  //         className={parent.saved ? 'hide' : ''}
  //         value={parent.title}
  //         onChange={e => setParent({ title: e.target.value })} />
  //       <button className={`btn ${parent.saved ? 'hide' : ''}`}
  //         onClick={createChart}>Save</button>
  //
  //       <button className={`btn ${parent.saved ? '' : 'hide'}`}
  //         onClick={addChildForm}>Add Child</button>
  //
  //       {children.map((n, index) => <ChartCreateChild key={index} parent={parent} addChildForm={addChildForm} setParent={setParent} />)}
  //     </div>
  //   </div>
  // </div>

export default ChartCreate;
