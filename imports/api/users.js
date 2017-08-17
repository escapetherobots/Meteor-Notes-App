import { Meteor } from 'meteor/meteor';
// use simpleSchema for validation
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;

  // check user submission against the schema
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({
    email: email
  });

  return true;
}

// check if this is a server or client method
if(Meteor.isServer){
  Accounts.validateNewUser(validateNewUser);
}



// SIMPLE SCHEMA EXAMPLES
// const petSchema = new SimpleSchema({
//   name: {
//       type: String,
//       min: 1,
//       max: 200,
//       optional: false
//   },
//   age: {
//     type: Number,
//     min: 0
//   },
//   contactNumber: {
//     type: String,
//     optional: true,
//     regEx: SimpleSchema.RegEx.Phone
//   }
// });
//
// const employeeSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 200,
//     optional: false
//   },
//   hourlyWage: {
//     type: Number,
//     min: 0
//   },
//   email: {
//     type: String,
//     optional: false,
//     regEx: SimpleSchema.RegEx.Email
//   }
// })
//
// employeeSchema.validate({
//   name: 'Jimbo',
//   hourlyWage: 4.50,
//   email: 'abc@abc.com'
// })
//
// // run validate on the schema and check logs in the terminal
// petSchema.validate({
//   name: 'Bob',
//   age: 3,
//   contactNumber: '801.644.153232'
// });
