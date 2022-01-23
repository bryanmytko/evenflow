import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Logo } from '../';
import { AuthService, UserService } from '../../services';

const Chart = () => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await UserService.getNodeSlug(params.slug);
      if(Object.keys(response.data).length === 0) return navigate('/login');
      if(!AuthService.currentUser() && response.data.node.private) return navigate('/login');
      setChart(response.data.node);
      setChildren(response.data.node.children);
    })();
  }, [params.slug, navigate]);

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
