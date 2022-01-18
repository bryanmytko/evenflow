import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Logo = () => {
  return <Link to="/">
    <div className="logo"></div>
  </Link>;
};

export default Logo;
