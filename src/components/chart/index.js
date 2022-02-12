import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
} from 'draft-js';

import { Breadcrumbs, Logo } from '../';
import { AuthService, UserService } from '../../services';

const Chart = () => {
  const [chart, setChart] = useState('');
  const [children, setChildren] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
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
    try {
      if(!chart.payload) return setEditorState(EditorState.createEmpty());
      const parsedContent = JSON.parse(chart.payload);
      setEditorState(EditorState.createWithContent(convertFromRaw(parsedContent)));
    } catch(err) {
      /* This is gross but we need to support legacy content which was a raw string */
      setEditorState(EditorState.createWithContent(ContentState.createFromText(chart.payload)));
    }
  }, [chart.payload]);

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
  };

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
    return <div className="editor-payload"><Editor readOnly={true} editorState={editorState} /></div>;
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
