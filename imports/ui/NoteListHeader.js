import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


export const NoteListHeader = (props) => {
  // create a note method by calling the meteor.call method
  const createNote = () => {
    // do something on the server and then run the callback when it finished
    props.meteorCall('notes.insert', (err, res) => {
      if (res){
        // this will return res = id of the newly inserted note
        // set the 'selectedId' in the session
        props.session.set('selectedNoteId', res);
        // change 'isNavOpen' in main.js
        // props.session.set('isNavOpen', false);
      }
    });
  };

  return (
    <div className="item-list__header">
      <button className="button" onClick={createNote}>Create Note</button>
    </div>
  );
}

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  session: React.PropTypes.object.isRequired
}

export default createContainer( () => {
  return {
    meteorCall: Meteor.call,
    session: Session
  }
}, NoteListHeader);
