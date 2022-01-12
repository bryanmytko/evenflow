import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const Header = () => {
  return <header>
    <nav>
      <div className="container nav-wrapper">
        <Link to="/">Evenflow.</Link>
        <ul className="right">
          <li>
            <Link to="/logout" onClick={AuthService.logout}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>;
};

export default Header;
