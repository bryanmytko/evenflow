import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const Header = () => {
  return <header className="pink accent-2">
    <div className="container right-align">
      <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
    </div>
  </header>;
};

export default Header;
