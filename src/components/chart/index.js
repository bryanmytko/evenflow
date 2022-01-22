import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Logo } from '../';
import UserService from '../../services/user.service';

const Chart = () => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await UserService.getNodeSlug(params.slug);
      setChart(response.data.node);
      setChildren(response.data.node.children);
    })();
  }, [params.id, navigate]);

  const content = () => {
    if(children.length){
     return <ul>
       {children.map(c => {
         return <li key={c._id}>
           <Link className="btn btn-large" to={`/chart/${c.slug}`}>{c.title}</Link>
         </li>
       })}
     </ul>;
    }
    return <p className="payload">{chart.payload}</p>;
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
