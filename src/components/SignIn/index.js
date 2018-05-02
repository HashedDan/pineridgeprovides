import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { auth, provider } from '../../firebase/firebase';
import { db } from '../../firebase';
import * as firebase from 'firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignInForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null
    }
  }

  async login() {
    const result = await auth.signInWithPopup(provider)
    this.setState({user: result.user});
    db.doCreateUser(result.user.uid, result.user.displayName, result.user.email)
  }

  async logout() {
    await auth.signOut()
    this.setState({user: null});
  }

  async componentWillMount() {
      const user = await auth.onAuthStateChanged((user) => {
        if(this.state.user) this.setState({user})
      }
    );
  }

  render() {
    return (
      <div>
      <p>{this.state.user ? `Hi, ${this.state.user.displayName}!` : 'Hi!'}</p>
        <button onClick={this.login.bind(this)}>
          Login with Facebook
        </button>

        <button onClick={this.logout.bind(this)}>
          Logout
        </button>
        </div>
    );
  }
}

export default withRouter(SignInForm);
