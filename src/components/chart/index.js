import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
// import DOMPurify from 'dompurify';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const Chart = () => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const params = useParams();

  useEffect(() => {
    if(AuthService.currentUser()) {
      UserService.getNode(params.id)
        .then(response => setChart(response.data));
      UserService.getNodeChildren(params.id)
        .then(response => setChildren(response.data.nodes));
    }
  }, [params.id]);

  return <div className="container">
    <div className="row padding-20">
      <div className="card node-card col s8 offset-s2">
        <h5>{chart.title}</h5>
        <em>{chart._id}</em>
         <ul>
           {children.map(c => {
             return <li key={c.title}>
               <Link className="btn" to={`/chart/${c._id}`}>{c.title}</Link>
             </li>
           })}
       </ul>
      </div>
    </div>
  </div>
};

export default Chart;
