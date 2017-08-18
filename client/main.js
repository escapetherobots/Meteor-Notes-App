import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import './../imports/startup/simple-schema-config';
import { onAuthChange, routes } from './../imports/routes/routes';
import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';

Tracker.autorun( () => {
  // watch for changes in/on these methods
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun( () => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup( () => {
  // Session set doesn't have to be in the tracker.autorun
  // Session.get has to be!
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});
