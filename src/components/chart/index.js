import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs, Logo } from '../';
import { AuthService, UserService } from '../../services';

const Chart = (props) => {
  const [chart, setChart] = useState([]);
  const [children, setChildren] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  console.log('PROPS', props);

  useEffect(() => {
    (async () => {
      const response = await UserService.getNodeSlug(params.slug);
      if(Object.keys(response.data).length === 0) return navigate('/login');
      if(!AuthService.currentUser() && response.data.node.private) return navigate('/login');
      setChart(response.data.node);
      setChildren(response.data.node.children);
    })();
  }, [params.slug, navigate]);

  const follow = ref => {
    const breadcrumb = { title: ref.title, slug: ref.slug };

    if(ref.direction === 'backward') {
      setBreadcrumbs([...breadcrumbs.slice(0, -1)]);
    } else {
      setBreadcrumbs([...breadcrumbs, breadcrumb]);
    }

    return navigate(`/chart/${ref.slug}`, { state: breadcrumbs });
  };

  const content = () => {
    if(children.length){
     return <ul>
       {children.map(c => {
         return <li key={c._id}>
           <button className="btn btn-large" onClick={() => follow(c)}>{c.title}</button>
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
      <Breadcrumbs breadcrumbs={breadcrumbs} follow={follow} />
      {content()}
    </div>
  </div>
};

export default Chart;
