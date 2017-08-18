import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

//======================================================

// ON ROUTE HANDLERS - do things when a route is triggered
//****************
// item selected
// if an item is selected set that in the Session, so is maintained on page refresh
// args: next state will have info about the component that will be loaded by said route
const onEnterNotePage = (nextState) => {
  // set the note id based on selection with Session
  Session.set('selectedNoteId', nextState.params.id);
};

//****************
const onLeaveNotePage = (nextState) => {
  // set the note id based on selection with Session
  Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  // check page status based on Session var from routes and tracker.autorun in main.js client
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/dashboard');
  } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/');
  }
  console.log('isAuthenticated', isAuthenticated);
}

//======================================================
// React Router V3
export const globalOnChange = (prevState, nextState) => {
    //console.log('globalOnChange');
    // run the globalOnEnter passing it the nextState from this function
    globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  //console.log('globalOnEnter');
  // debugger // make sure the dev tools are open!
  const lastRoute = nextState.routes[nextState.routes.length -1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} /* Use this as a wrapper route*/>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route
          path="/dashboard/:id"
          component={Dashboard}
          privacy="auth"
          onEnter={onEnterNotePage}
          onLeave={onLeaveNotePage}
        />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

// window.browserHistory = browserHistory;
