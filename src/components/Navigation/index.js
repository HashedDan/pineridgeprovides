import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <div></div>
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
  // <ul>
  //   <li><Link to={routes.HOME}>Home</Link></li>
  //   <li><Link to={routes.ACCOUNT}>Account</Link></li>
  //   <li><SignOutButton /></li>
  // </ul>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">PRP</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#"><Link to={routes.HOME}>Home</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><Link to={routes.ACCOUNT}>Account</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><Link to={routes.CREATE}>Create</Link></a>
        </li>
        <SignOutButton />
      </ul>
    </div>
  </nav>

const NavigationNonAuth = () =>
  <ul>
    {/* <li><Link to={routes.SIGN_IN}>Sign In</Link></li> */}
  </ul>

export default Navigation;
