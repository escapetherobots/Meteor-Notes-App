import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// get the non-higher order component
import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient){
  describe('Editor', function(){

    let browserHistory;
    let call;

    beforeEach(function(){
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    //----------------------------------------------------
    it('should render pick note message', function(){

      const wrapper = mount( <Editor call={call} browserHistory={browserHistory}/> );
      expect(wrapper.find('p#defaultText').text()).toBe('Pick or create a note to get started');
    });

    //----------------------------------------------------
    it('should render "no note found" message', function(){

      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
          selectedNoteId={notes[0]._id}
        />
      );
      expect(wrapper.find('p#defaultText').text()).toBe('Note not found');
    });

    //----------------------------------------------------
    it('should remove note', function(){

      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
          selectedNoteId={notes[0]._id}
          note={notes[0]}
        />
      );
      wrapper.find('button').simulate('click');
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    //----------------------------------------------------
    it('should update the note body on textarea change', function(){
      const newBody = "new body text";
      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
          selectedNoteId={notes[0]._id}
          note={notes[0]}
        />
      );
      wrapper.find('textarea').simulate('change', {
        target: {value: newBody}
      });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
    });

    //----------------------------------------------------
    it('should update the note title on input change', function(){
      const newTitle = "new title text";
      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
          selectedNoteId={notes[0]._id}
          note={notes[0]}
        />
      );
      wrapper.find('input').simulate('change', {
        target: {value: newTitle}
      });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    //----------------------------------------------------
    it('should set state for new note', function(){
      const newTitle = "new title text";
      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
        />
      );

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);

    });

    //----------------------------------------------------
    it('should not set state if note prop not provided', function(){
      const newTitle = "new title text";
      const wrapper = mount(
        <Editor
          call={call}
          browserHistory={browserHistory}
        />
      );

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');

    });


  });
}
