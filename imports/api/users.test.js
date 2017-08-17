//mocha - avoid arrow functions
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

//=====================================================
//SERVER METHODS ONLY
if(Meteor.isServer){
  describe('Users', function(){
//------------------------------------------------------
    it('should allow valid email address', function(){
      // test email
      const testUser = {
        emails: [
          {address: 'Test@example.com'}
        ]
      };

      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });
//------------------------------------------------------
    it('should reject invalid email', function(){})
      const testUser = {
        emails: [
          {address: 'awesome.com'}
        ]
      };

      expect( () => {
        validateNewUser(testUser);
      }).toThrow();

  });
}


// describe('Square Tests', function(){
//
//   //==========================================================
//   it('should square a number', function () {
//     const res = square(4);
//
//     if(res !== 16){
//       throw new Error('num was not squared');
//     }
//   });
// });
