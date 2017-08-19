import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

// import the non-higher order function
import { NoteListHeader } from './NoteListHeader';
import { notes } from './../fixtures/fixtures';

if(Meteor.isClient){
  describe('NoteListHeader', function(){

    let Session;
    let meteorCall;

    beforeEach(function(){
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });


    //----------------------------------------------------
    it('should call meteorCall on click', function(){
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} session={Session}/> );

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id); // Meteor.call('notes.insert', (err, res)=>{})
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);

    });

    //----------------------------------------------------
    it('should not set session for failed insert ', function(){
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} session={Session}/> );

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined); // Meteor.call('notes.insert', (err, res)=>{})

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();

    });






  });
}
