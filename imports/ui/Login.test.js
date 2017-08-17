import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// get the non-higher order component
import { Login } from './Login';

if(Meteor.isClient){
  describe('Login', function(){

    //----------------------------------------------------
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = mount( <Login loginWithPassword={() => {}}/>);

      wrapper.setState({error: error});

      expect(wrapper.find('p#errorMessage').text()).toBe(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p#errorMessage').length).toBe(0);
    });

    //----------------------------------------------------
    it('should call loginWithPassword with the form data', function(){
      const email = "zzz@test.com";
      const password = "password123";
      const spy = expect.createSpy();

      const wrapper = mount( <Login loginWithPassword={spy} /> );
      // set value of those form fields
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      // then find the form node
      wrapper.find('form').simulate('submit');

      // spy is an array, it stores the value of each time the spy func is called
      // just grab the first instance
      expect(spy.calls[0].arguments[0]).toEqual({email});
      expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    //----------------------------------------------------
    it('should set loginWithPassword callback errors', function(){
      const spy = expect.createSpy();
      const wrapper = mount( <Login loginWithPassword={spy} /> );

      wrapper.find('form').simulate('submit');
      // the third argument should be a function
      // then execute the spy with an empty object
      spy.calls[0].arguments[2]({});
      // the spy should set an error on the state, so length should be 1
      const res = wrapper.state('error');
      expect(res.length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}
