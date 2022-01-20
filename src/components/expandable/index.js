import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Expandable = props => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
  }, [expanded]);

  const truncateContent = content => {
    const limit = 60;
    if(content.length > limit && !expanded) {
      return <>
        {content.substring(0, limit)}
        &nbsp; 
        <Link to="/" onClick={e => expand(e)}>more...</Link>
      </>;
    } else if(content.length > limit) {
      return <>
        {content}
        <br /><br />
        <Link to="/" onClick={e => expand(e)}>hide</Link>
      </>;
    }

    return content;
  }

  const expand = e => {
    e.preventDefault();
    setExpanded(!expanded);
  }

  return <p className="payload">{truncateContent(props.content)}</p>;
};

export default Expandable;
