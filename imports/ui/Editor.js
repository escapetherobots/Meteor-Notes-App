import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
// Notes API
import { Notes } from './../api/notes';

export class Editor extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: '',
      body: ''
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleTitleChange(e){
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update', this.props.note._id, {title});
  }

  handleBodyChange(e){
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id, {body});
  }

  handleDelete(){
    this.props.call('notes.remove', this.props.note._id);
    // don't want to remove history, just want to add to it: PUSH
    this.props.browserHistory.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState){
    // whatch for changes in props
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    // *** ONLY UPDATE STATE if different ID ***
    // this will prevent infinite looping
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }

  render(){
    if (this.props.note) {
      return (
        <div>
          <input
            ref="editorTitle"
            value={this.state.title}
            placeholder="Enter Title"
            onChange={this.handleTitleChange}/>
          <textarea
            ref="editorBody"
            value={this.state.body}
            placeholder="Your note here"
            onChange={this.handleBodyChange}>
          </textarea>
          <button onClick={this.handleDelete}>Delete Note</button>
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
 call: React.PropTypes.func.isRequired,
 browserHistory: React.PropTypes.object.isRequired
}

// this connects to Tracker.autorun
export default createContainer( () => {
  const selectedNoteId = Session.get('selectedNoteId');

  // WHY IS METEOR.CALL pass as a prop through autotracker
  // we want autotracker to track the method
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
