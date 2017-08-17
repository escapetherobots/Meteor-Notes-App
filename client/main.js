import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import './../imports/startup/simple-schema-config';
import { onAuthChange, routes } from './../imports/routes/routes';
import { Tracker } from 'meteor/tracker';

Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup( () => {
  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});
