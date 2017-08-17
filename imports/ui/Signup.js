import React from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import Logo from './Logo';

export class Signup extends React.Component {
  constructor(props){
    super(props);

    // set Default Props
    // this.props = {
    //
    // }

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

    // password validation
    if(password.length < 9){
      return this.setState({error: 'Password must be more than 8 characters'});
    }


    // use es6 object property assignment {email: email}
    // pass method from Account.createUser through higherOrder to props
    this.props.createUser({email, password}, (err) => {
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
          <h1>Signup</h1>
          {this.state.error ? <p id="errorMessage">{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} >
            <input type="email" ref="email" name="email" placeholder="Email" required />
            <input type="password" ref="password" name="password" placeholder="Password" required />
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: React.PropTypes.func.isRequired
}

export default createContainer( () => {
  return {
    createUser: Accounts.createUser
  }
}, Signup);
