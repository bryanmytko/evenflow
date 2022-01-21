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
      return <p>
        {content.substring(0, limit)}
        &nbsp;
        <Link to="/" onClick={e => expand(e)}>more...</Link>
      </p>;
    } else if(content.length > limit) {
      return <p>
        {content}
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
