import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Logo from './Logo';
import { createContainer } from 'meteor/react-meteor-data';

// prevents default and provides connection to History api
import { Link } from 'react-router';

export class Login extends React.Component {
  constructor(props){
    super(props);

    //set state in the constructor
    this.state = {
      error: ''
    };

  }

  onSubmit(e){
    e.preventDefault();

    //trim method removes trailing spaces
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    // use es6 object property assignment {email: email}
    // get this function from the container props
    this.props.loginWithPassword({email}, password, (err) => {
      if(err) {
        this.setState({error: `${err.reason}, enter valid email and password. `});
      } else {
        this.setState({error: ''});
      }
    });
    // this.setState({
    //   error: 'Something went wrong.'
    // });
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Meteor Notes</h1>
          <h2>Login</h2>
          <p>app description</p>
          {this.state.error ? <p id="errorMessage">{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} >
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Account Login</button>
          </form>

          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
}

export default createContainer( () => {
  // this callback function is reactive, it gets passed through tracker.autorun
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login);
