import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import DOMPurify from 'dompurify';

import { Logo } from '../';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const Chart = () => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const params = useParams();

  useEffect(() => {
    if(AuthService.currentUser()) {
      UserService.getNode(params.id)
        .then(response => {
          setChart(response.data.node);
          setChildren(response.data.node.children);
        });
    }
  }, [params.id]);

  const content = () => {
    if(children.length){
     return <ul>
       {children.map(c => {
         return <li key={c._id}>
           <Link className="btn btn-large" to={`/chart/${c._id}`}>{c.title}</Link>
         </li>
       })}
     </ul>;
    }
    return <p>{chart.payload}</p>;
  }

  return <div className="main-container container">
    <div className="node-card">
     <Logo />
      <h5>{chart.title}</h5>
      <hr />
      {content()}
    </div>
  </div>
};

export default Chart;
