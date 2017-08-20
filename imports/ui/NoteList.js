import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from './../api/notes';
import { Session } from 'meteor/session';

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
      <div className="item-list">
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
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    // now subscribed you can access Notes collection
    // and query with Notes.find()
    notes: Notes.find({}, { // find all, and with these modifiers
      sort: {
        updatedAt: -1 // descending
      }
    }).fetch().map( (note) => {
        return {
          ...note,
          selected: note._id === selectedNoteId // boolean
        }
    })
  }

}, NoteList);
