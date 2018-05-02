import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreatePage extends Component {
  constructor(props, { authUser }) {
    super(props);

    this.state = {
      authUser: authUser,
      title: '',
      description: '',
      directions: '',
      owner: authUser.uid,
      status: 'Submitted',
      claimer: '',
      error: null
    };
  }

  onSubmit = (event) => {
    const { title, description, directions, owner, status, claimer } = this.state;
    db.doCreateRequest(title, description, directions, owner, status, claimer)
      .then(() => {
        alert("Successful submission!");
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
    event.preventDefault();
  }

  render() {
    const { authUser, title, description, directions, owner, status, claimer, error } = this.state;

    const isInvalid =
      title === '' || description === '' || directions === '';

    return (
      <form onSubmit={this.onSubmit}>
      <div class="form-group">
        <label>Title</label>
        <input
          onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
          className="form-control"
          placeholder="What is your main request?"
        />
      </div>
      <div class="form-group">
        <label>Description</label>
        <input
          onChange={event => this.setState(updateByPropertyName('description', event.target.value))}
          className="form-control"
          placeholder="Now give a little more detail on it..."
        />
      </div>
      <div class="form-group">
        <label>Directions</label>
        <input
          onChange={event => this.setState(updateByPropertyName('directions', event.target.value))}
          className="form-control"
          placeholder="Where do you need materials deliverd to?"
        />
      </div>
        <button disabled={isInvalid} type="submit">
          Submit
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

CreatePage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(CreatePage);