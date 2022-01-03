import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const Header = () => {
  return <header>
    <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
  </header>;
};

export default Header;
