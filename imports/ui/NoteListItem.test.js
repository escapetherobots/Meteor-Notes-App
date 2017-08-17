import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
  describe('Note List Item', function(){

    //----------------------------------------------------
    it('should render time and time stamp', function(){
      const title = 'ztitle1';
      const updatedAt = 1503009165061;
      const wrapper = mount( <NoteListItem note={ {title, updatedAt} }/> );

      expect(wrapper.find('h5').text()).toBe(title);
      // formatted timestamp result
      expect(wrapper.find('p').text()).toBe('8/17/17');

    });

    //----------------------------------------------------
    it('should set default title if no title set', function(){
      const wrapper = mount( <NoteListItem note={ {} }/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');

    });
  });
}
