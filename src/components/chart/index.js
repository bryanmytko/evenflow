import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs, Logo } from '../';
import { AuthService, UserService } from '../../services';

const Chart = () => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
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

  useEffect(() => {
    setBreadcrumbs(JSON.parse(window.localStorage.getItem('breadcrumbs')) || []);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
  }, [breadcrumbs]);


  const follow = (next, current) => {
    const newBreadcrumb = { title: current.title, slug: current.slug };
    setBreadcrumbs([...breadcrumbs, newBreadcrumb]);
    return navigate(`/chart/${next.slug}`, { state: breadcrumbs });
  };

  const goBack = current => {
    const len = breadcrumbs.indexOf(current);
    setBreadcrumbs([...breadcrumbs.slice(0, len)]);
    return navigate(`/chart/${current.slug}`, { state: breadcrumbs });
  }

  const content = () => {
    if(children.length){
     return <ul>
       {children.map(c => {
         return <li key={c._id}>
           <button className="btn" onClick={() => follow(c, chart)}>{c.title}</button>
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
      <Breadcrumbs breadcrumbs={breadcrumbs} goBack={goBack} />
      {content()}
    </div>
  </div>
};

export default Chart;
