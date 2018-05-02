import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class AccountPage extends Component {
  constructor(props, { authUser }) {
    super(props);
    console.log(authUser);
    this.state = {
      requests: [],
      authUser: authUser,
    };

    this.finish.bind(this);
  }

  componentDidMount() {
    db.onceGetRequests().then(snapshot =>
      this.setState(() => ({ requests: fromObjectToList(snapshot.val()) }))
    );
  }

  finish = (id) => {
    db.doFinishRequest(id, "Complete");
  }

  render() {
    const { requests, authUser } = this.state;

    return (
      <div className='row'>
        <h1>Hi, {authUser.displayName}! View your submitted and claimed requests below!</h1>
        { !!requests.length && <RequestList name={"Submitted"} requests={requests} authUser={authUser} /> }
        { !!requests.length && <RequestList name={"Claimed"} finish={this.finish} requests={requests} authUser={authUser} /> }
      </div>
    );
  }
}

const RequestList = ({ name, finish, requests, authUser }) =>
  <div className='col-6' >
    <h3>{name}</h3>
    {name == "Submitted" ?
    <h5>These are requests that you have submitted.</h5>
    : <h5>These are requests from the community that you have claimed.</h5>
    }
    {requests.reduce((requestsEdit, request) =>
    {
      {if ((name == "Submitted" && request.owner == authUser.uid )|| (name == "Claimed" && request.claimer == authUser.uid))
        requestsEdit.push(request);
      }
      return requestsEdit;
    }, []).map(request =>
        <div key={request.index} className="card">
        <div className="card-body">
          <h5 className="card-title">{request.title}</h5>
          {request.owner == authUser.uid ?
            <p style={{color: 'red'}}><i>This is your request.</i></p>
            : <p></p>
          }
          <p className="card-text"> Description: { request.description }</p>
          <p className="card-text"> Directions: { request.directions }</p>
          {request.status == "Submitted" && request.owner != authUser.uid ?
            <a href="#" className="btn btn-success">Claim</a>
            : (request.status == "Claimed" && request.owner == authUser.uid ?
            <a href="#" className="btn btn-warning disabled">In Progress</a>
            : ( request.status == "Claimed" && request.claimer == authUser.uid ?
              <a href="#" onClick={() => finish(request.index)} className="btn btn-warning">Finish Task</a>
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

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);