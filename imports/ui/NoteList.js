import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
      <div>
        <NoteListHeader />
        Note list { props.notes.length }

      </div>
    );
}


NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}

// createContainer will run like tracker.autorun
export default createContainer( () => {
  // subscribe to Meteor.publish in the Notes API
  // if you don't subscribe it can't connect to the state.
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()

  }
}, NoteList);
