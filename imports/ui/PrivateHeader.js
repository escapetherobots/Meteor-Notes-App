import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import Logo from './Logo';
// this container component runs through tracker.autorun
import { createContainer } from 'meteor/react-meteor-data';

// PRESENTATIONAL COMPONENT
export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  const onGoHome = () => {
    browserHistory.push('/');
  };
  const onGoSignup = () => {
    browserHistory.push('/signup');
  };
  const onGoTestPage = () => {
    browserHistory.push('/test');
  };


  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
        <h1 className="header__title">{props.title}</h1>

        <button className="button button--link-text" onClick={props.handleLogout}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
    title: React.PropTypes.string.isRequired,
    handleLogout: React.PropTypes.func.isRequired,
    handleNavToggle: React.PropTypes.func.isRequired,
    isNavOpen: React.PropTypes.bool.isRequired
}

PrivateHeader.defaultProps = {
  title: 'My Generic Title'

};

export default createContainer( () => {
  //this runs the component through tracker.autorun
  // anything that gets returned here will be passed to the presentational Component as props
  // that's why the handleLogout method is a prop
  return {
    // this becomes a prop passed to the PrivateHeader Component below
    handleLogout: () => {
      return Accounts.logout();
    },
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader);
