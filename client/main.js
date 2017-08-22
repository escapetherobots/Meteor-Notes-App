import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import './../imports/startup/simple-schema-config';
import { onAuthChange, routes } from './../imports/routes/routes';
import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';

// WATCH FOR AUTHORIZATION
Tracker.autorun( () => {
  // watch for changes in/on these methods
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

// WATCH FOR SELECTED NOTE
Tracker.autorun( () => {
  // watch for a note being selected at anytime
  // will set the id of whatever note was selected
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);

  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

// WATCH FOR NAV OPEN
Tracker.autorun( () => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen) // 2nd arg will not toggle if condition already exists
});

Meteor.startup( () => {
  // Session set doesn't have to be in the tracker.autorun
  // Session.get has to be!
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});
