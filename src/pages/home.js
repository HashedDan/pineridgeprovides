import React, { Component } from 'react';

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    db.onceGetRequests().then(snapshot =>
      this.setState(() => ({ requests: fromObjectToList(snapshot.val()) }))
    );
  }

  render() {
    const { requests } = this.state;

    return (
      <div>
        <h1>Recent Requests</h1>
        <p>These are the items most needed by others in your community.</p>

        { !!requests.length && <RequestList requests={requests} /> }
      </div>
    );
  }
}

const RequestList = ({ requests }) =>
  <div>
    {requests.map(request =>
      <div key={request.index} className="card">
        <div className="card-body">
          <h5 className="card-title">{request.title}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          {request.status == "unclaimed" ?
            <a href="#" className="btn btn-success">Claim</a>
            : <a href="#" className="btn btn-warning disabled">In Progress</a>
          }
        </div>
      </div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);