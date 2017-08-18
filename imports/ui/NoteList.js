import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from './../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {

    const renderNotes = () => {
      if(props.notes.length > 0 ){
        return props.notes.map( (note) => {
            return (
              <NoteListItem key={note._id} note={note} />
            );
        });
      } else {
        return <NoteListEmptyItem />
      }

    };

    return (
      <div>
        <NoteListHeader />
        { renderNotes() }

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
