import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// get regular component not the higherOrder
import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient){
  describe('PrivateHeader', function(){

    //----------------------------------------------------
    it('should set button text to log out', function(){
      // wrappers are building blocks for enzyme assertions
      const wrapper = mount( <PrivateHeader title="test title" handleLogout={() => {}}/> );
      // use query language to travers component
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    //----------------------------------------------------
    it('should use title prop as h1 text', function(){
      const title = 'Test title here';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      // use query language to travers component
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });

    //----------------------------------------------------
    it('should call the function', function(){
      // create function spy
      const spy = expect.createSpy();
      spy(3, 4, 5);
      spy('ztest');
      // this will throw error if the spy was never called
      expect(spy).toHaveBeenCalled(3,4,5);
    });

    //----------------------------------------------------
    it('should call handle logout on click', function(){
      const title = 'Test title here';
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title={title} handleLogout={spy}/> );

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });


  });
}
