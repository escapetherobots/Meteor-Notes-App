import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// get the non-higher order component
import { Signup } from './Signup';

if(Meteor.isClient){
  describe('Signup', function(){

    //----------------------------------------------------
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = mount( <Signup createUser={() => {}}/>);

      wrapper.setState({error: error});

      expect(wrapper.find('p#errorMessage').text()).toBe(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p#errorMessage').length).toBe(0);
    });

    //----------------------------------------------------
    it('should call createUser with the form data', function(){
      const email = "zzz@test.com";
      // must be 9 chars
      const password = "password123";
      const spy = expect.createSpy();

      const wrapper = mount( <Signup createUser={spy} /> );
      // set value of those form fields
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      // then find the form node
      wrapper.find('form').simulate('submit');

      // spy is an array, it stores the value of each time the spy func is called
      // just grab the first instance
      expect(spy.calls[0].arguments[0]).toEqual({email, password});
    });

    //----------------------------------------------------
    it('should set error if password to small', function(){
      const email = "zzz@test.com";
      // must be 9 chars if not throw errror
      const password = "pass";
      const spy = expect.createSpy();

      const wrapper = mount( <Signup createUser={spy} /> );
      // set value of those form fields
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      // then find the form node
      wrapper.find('form').simulate('submit');

      // spy is an array, it stores the value of each time the spy func is called
      // just grab the first instance
      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    //----------------------------------------------------
    it('should set createUser callback errors', function(){
      const spy = expect.createSpy();
      const reason = 'This pass isnt working';
      const password = "password123";
      const wrapper = mount( <Signup createUser={spy} /> );
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');

      // the third argument should be a function
      // then execute the spy with an empty object
      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}
