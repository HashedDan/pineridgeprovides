import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  constructor(props, { authUser }) {
    super(props);
    console.log(authUser);
    this.state = {
      requests: [],
      authUser: authUser,
    };
  }

  componentDidMount() {
    db.onceGetRequests().then(snapshot =>
      this.setState(() => ({ requests: fromObjectToList(snapshot.val()) }))
    );
  }

  render() {
    const { requests, authUser } = this.state;

    return (
      <div>
        <h1>Recent Requests</h1>
        <p>These are the items most needed by others in your community.</p>

        { !!requests.length && <RequestList requests={requests} authUser={authUser} /> }
      </div>
    );
  }
}

const RequestList = ({ requests, authUser }) =>
  <div>
    {requests.map(request =>
      <div key={request.index} className="card">
        <div className="card-body">
          <h5 className="card-title">{request.title}</h5>
          {request.owner == authUser.uid ?
            <p style={{color: 'red'}}><i>This is your request.</i></p>
            : <p></p>
          }
          <p className="card-text"> Description: { request.description }</p>
          <p className="card-text"> Directions: { request.directions }</p>
          {request.status == "unclaimed" ?
            <a href="#" className="btn btn-success">Claim</a>
            : <a href="#" className="btn btn-warning disabled">In Progress</a>
          }
        </div>
      </div>
    )}
  </div>

HomePage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);