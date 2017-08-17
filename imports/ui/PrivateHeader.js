import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import Logo from './Logo';
// this container component runs through tracker.autorun
import { createContainer } from 'meteor/react-meteor-data';

// PRESENTATIONAL COMPONENT
export const PrivateHeader = (props) => {
  const onGoHome = () => {
    browserHistory.push('/');
  }
  const onGoSignup = () => {
    browserHistory.push('/signup');
  }
  const onGoTestPage = () => {
    browserHistory.push('/test');
  }


  return (
    <div className="header">
      <div className="header__content">
        <Logo stylingInfo={"logo--small"} />
        <h1 className="header__title">{props.title}</h1>

        <button className="button button--link-text" onClick={props.handleLogout}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
    title: React.PropTypes.string.isRequired,
    handleLogout: React.PropTypes.func.isRequired
}

PrivateHeader.defaultProps = {
  title: 'My Generic Title'
};

export default createContainer( () => {
  // anything that gets returned here will be passed to the presentational Component as props
  // that's why the handleLogout method is a prop
  return {
    // this becomes a prop passed to the PrivateHeader Component below
    handleLogout: () => {
      return Accounts.logout();
    }
  }
}, PrivateHeader);
