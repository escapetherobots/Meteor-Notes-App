import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// Customize Error that is thrown
SimpleSchema.defineValidationErrorTransform( (error) => {
  return new Meteor.Error(400, error.message);
  // const customError = new MyCustomErrorType(error.message);
  // customError.errorList = error.details;
  // return customError;
});
