import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

// users model api
import '../imports/api/users';
import '../imports/api/notes';

import './../imports/startup/simple-schema-config';


Meteor.startup(() => {

});
