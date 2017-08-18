import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
// Notes API
import { Notes } from './../api/notes';

export class Editor extends React.Component{
  constructor(props){
    super(props);

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(e){
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    })
  }

  handleBodyChange(e){
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    })
  }

  render(){
    if (this.props.note) {
      return (
        <div>
          <input
            defaultValue={this.props.note.title ? this.props.note.title : undefined}
            placeholder="Enter Title"
            onChange={this.handleTitleChange}/>
          <textarea
            defaultValue={this.props.note.body}
            placeholder="Your note here"
            onChange={this.handleBodyChange}>
          </textarea>
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>
          { this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started'}
          </p>
        </div>
      );
    }



  }
}


Editor.propTypes = {
 note: React.PropTypes.object,
 selectedNoteId: React.PropTypes.string,
 call: React.PropTypes.func.isRequired
}

// this connects to Tracker.autorun
export default createContainer( () => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
