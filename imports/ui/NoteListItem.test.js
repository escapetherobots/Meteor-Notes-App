import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import { notes } from './../fixtures/fixtures';

// use the unconnected - non-higher order version of the component
// the props exist either way,
// but the connected version won't allow for spy injection because it's already set
import { NoteListItem } from './NoteListItem';

if(Meteor.isClient){
  describe('NoteListItem', function(){
    // create a session with a spy
    // and pass this to the component instead of a normal Session method
    let Session;

    beforeEach( () => {
      Session = {
        set: expect.createSpy()
      };
    });

    //----------------------------------------------------
    it('should render time and time stamp', function(){
      const wrapper = mount( <NoteListItem note={ notes[0] } session={Session}/> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      // formatted timestamp result
      expect(wrapper.find('p').text()).toBe('8/17/17');

    });

    //----------------------------------------------------
    it('should set default title if no title set', function(){
      const wrapper = mount( <NoteListItem note={ notes[1] } session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');

    });

    //----------------------------------------------------
    it('should call set on click', function(){
      const wrapper = mount( <NoteListItem note={ notes[0] } session={Session}/> );
      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);

    });
  });
}
