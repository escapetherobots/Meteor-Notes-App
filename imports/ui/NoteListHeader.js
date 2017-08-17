import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const NoteListHeader = (props) => {
  const createNote = () => {
    props.meteorCall('notes.insert');
  };

  return (
    <div>
      Note List Header
      <button onClick={createNote}>Create Note</button>
    </div>
  );
}


export default createContainer( () => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader);
