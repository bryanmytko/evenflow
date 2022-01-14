import React from 'react';
import { useState } from 'react';

import ChartCreateChild from './chartCreateChild';
import UserService from '../../services/user.service';

import './style.css';

const dummyData = { nodes: [{
  title: "Grandpa",
  id: "1",
  children: [
    {
      title: "Mom",
      id: "2",
      children: [{
        title: "Bryan",
        id: "4",
        children: []
      },
      {
        title: "Erica",
        id: "5",
        children: [{
          title: "Grandkid",
          id: "7",
          children: []
        }]
      }]
    },
    {
      title: "Aunt",
      id: "3",
      children: [
        {
          title: "Cousin",
          id: "6",
          children: []
        }
      ]
    }
  ]
}]};

const findById = (data, id, childNode) => {
  const iter = (a) => {
    if (a._id === id) {
      a.children ? a.children.push(childNode) : a.children = [childNode];
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }

  let result;
  data.some(iter);
  return data;
}

const ChartCreate = () => {

  /* This is the basic pattern we are basing this all on */
  const returnChildren = (child) => {
    return <>
      <div className="indented">{child.title}
        {(child.children || []).map((child, index) => returnChildren(child))}
      </div>
    </>
  }
  return <>
    <h5>{dummyData.nodes[0].title}</h5>
    {(dummyData.nodes[0].children || []).map((child, index) => returnChildren(child))}
  </>;


  // const nestedNodes = (parent.children || []).map((child, index) => {
  //   return <>
  //     <p key={index}>{child.title}</p>
  //     <ChartCreateChild />
  //   </>;
  // });

//   const [title, setTitle] = useState('');
//   const [parentCreated, setParentCreated] = useState(false);
//   const [chartData, setChartData] = useState({ nodes: [] });
//   const [workingChild, setWorkingChild] = useState({ title: '' });
//
//   const createParent = async () => {
//     /* @TODO Error handling */
//     const response = await UserService.createNode({ title });
//     const { node: parent } = response.data;
//
//     setChartData({ nodes: [...chartData.nodes, parent] });
//     setParentCreated(true);
//   };
//
//   const createChild = async () => {
//     const response = await UserService.createNode({
//       title: workingChild.title,
//       parentId: workingChild.parentId
//     });
//     const { node: childNode } = response.data;
//
//     const newStuff = findById(chartData.nodes, workingChild.parentId, childNode);
// console.log(newStuff)
//     setChartData({ nodes: newStuff });
//   };





  // const foofoo = (node) => {
  //   return <ChartCreateChild key={node._id}
  //     parent={node}
  //     workingChild={workingChild}
  //     setWorkingChild={setWorkingChild}
  //     createChild={createChild} />
  // }
  //
  // if(parentCreated) {
    // const nestedNodes = (parent.children || []).map((child, index) => {
    //   return <>
    //     <p key={index}>{child.title}</p>
    //     <ChartCreateChild />
    //   </>;
    // });
// {//nestedNodes}
  //   return <>
  //     { chartData.nodes.map(node => foofoo(node)) }
  //   </>;
  // }

  // return <div style={{marginLeft: "30px"}}>
  //   <input placeholder="Title"
  //     value={title}
  //     onChange={e => setTitle(e.target.value)} />
  //   <button className="btn"
  //     onClick={createParent}>Save</button>
  // </div>;
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
