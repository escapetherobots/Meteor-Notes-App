import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

//======================================================
// determine authentication
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard']

// ON ROUTE HANDLERS - do things when a route is triggered
//****************
// public pages
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
//****************
// private pages
const onEnterPrivatePage = () => {
  if (!Meteor.userId()){
    browserHistory.replace('/');
  }
};

//****************
// item selected
// if an item is selected set that in the Session, so is maintained on page refresh
// args: next state will have info about the component that will be loaded by said route
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace(`/`);
  } else {
    //console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/dashboard');
  } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/');
  }
  console.log('isAuthenticated', isAuthenticated);
}

//======================================================
// Routes
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage}/>
    <Route path="*" component={NotFound} />
  </Router>
);

// window.browserHistory = browserHistory;
