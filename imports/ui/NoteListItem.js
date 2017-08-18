import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  const renderNote = () => {
    props.session.set('selectedNoteId', props.note._id);
  };

  return (
    <div onClick={renderNote}>
      <h5>{props.note.title || 'Untitled note'}</h5>
      { props.note.selected ? 'selected' : undefined }
      <p>{props.note.body || 'please add details'}</p>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
      <hr />
    </div>
  );
}

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  session: React.PropTypes.object.isRequired
};

export default createContainer( () => {
  return {
    session: Session
  }

}, NoteListItem);
