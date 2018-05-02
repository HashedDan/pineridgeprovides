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

    this.claim.bind(this);
    this.finish.bind(this);
  }

  componentDidMount() {
    db.onceGetRequests().then(snapshot =>
      this.setState(() => ({ requests: fromObjectToList(snapshot.val()) }))
    );
  }

  claim = (id) => {
    db.doClaimRequest(id, "Claimed", this.state.authUser.uid);
  }

  finish = (id) => {
    db.doFinishRequest(id, "Complete");
  }

  render() {
    const { requests, authUser } = this.state;

    return (
      <div>
        <h1>Recent Requests</h1>
        <p>These are the items most needed by others in your community.</p>

        { !!requests.length &&
          <div>
          {requests.map(request =>
            <div key={request.index} className="card">
              <div className="card-body">
                <h5 className="card-title">{request.title}</h5>
                {request.owner == authUser.uid ?
                  <p style={{color: 'red'}}><i>You submitted this request.</i></p>
                  : ( request.claimer == authUser.uid ?
                    <p style={{color: 'red'}}><i>You claimed this request.</i></p>
                    : <p></p>
                  )
                }
                <p className="card-text"> Description: { request.description }</p>
                <p className="card-text"> Directions: { request.directions }</p>
                {request.status == "Submitted" && request.owner != authUser.uid ?
                  <a href="#" onClick={() => this.claim(request.index)} className="btn btn-success">Claim</a>
                  : (request.status == "Claimed" && request.owner == authUser.uid ?
                  <a href="#" className="btn btn-warning disabled">In Progress</a>
                  : ( request.status == "Claimed" && request.claimer == authUser.uid ?
                    <a href="#" onClick={() => this.finish(request.index)} className="btn btn-warning">Finish Task</a>
                   : (
                  request.status == "Submitted" && request.owner == authUser.uid ?
                  <a href="#" className="btn btn-success disabled">Waiting to be claimed...</a>
                  : <a href="#" className="btn btn-primary disabled">Complete</a>)
                ))
                }
              </div>
            </div>
          )}
        </div>
        }
      </div>
    );
  }
}

// const RequestList = ({ requests, authUser }) =>
  

HomePage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);