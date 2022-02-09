import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
} from 'draft-js';

import './style.css';

const Expandable = props => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
  }, [expanded]);

  const truncateContent = content => {
    let editorState;

    try {
      const parsedContent = JSON.parse(content);
      editorState = EditorState.createWithContent(convertFromRaw(parsedContent));
    } catch(err) {
      /* This is gross but we need to support legacy content which was a raw string */
      editorState = EditorState.createWithContent(ContentState.createFromText(content));
    }

    const plainContent = editorState.getCurrentContent().getPlainText('\u0001');
    const limit = 30;

    if(content.length > limit && !expanded) {
      return <p>
        {plainContent.substring(0, limit)}
        &nbsp;
        <Link to="/" onClick={e => expand(e)}>more...</Link>
      </p>;
    } else if(content.length > limit) {
      return <p>
        {plainContent}
        <br /><br />
        <Link to="/" onClick={e => expand(e)}>hide</Link>
      </p>;
    }

    return content;
  }

  const expand = e => {
    e.preventDefault();
    setExpanded(!expanded);
  }

  return <div className="payload">{truncateContent(props.content)}</div>;
};

export default Expandable;
