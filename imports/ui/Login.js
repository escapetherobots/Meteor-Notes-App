import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Logo from './Logo';

// prevents default and provides connection to History api
import { Link } from 'react-router';

class Login extends React.Component {
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
    Meteor.loginWithPassword({email}, password, (err) => {
      if(err) {
        this.setState({error: err.reason});
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
          <Logo />
          <h1>Login</h1>
          <p>app description</p>
          {this.state.error ? <p>{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} >
            <input type="email" ref="email" name="email" placeholder="Email" required />
            <input type="password" ref="password" name="password" placeholder="Password" required />
            <button className="button">Account Login</button>
          </form>

          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    );
  }
}

export default Login;
