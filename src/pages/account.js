import React from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../components/Session/withAuthorization';

const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.displayName}</h1>
    <h3>Email: {authUser.email}</h3>
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);