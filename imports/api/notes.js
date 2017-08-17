import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

// Get all of the user's notes from the DB
if(Meteor.isServer){
  // get this data in the client with: Meteor.subscribe('notes') => the arg is the api key
  Meteor.publish('notes', function(){
    return Notes.find({ userId: this.userId })
  });

}

Meteor.methods({
  'notes.insert'(){ // insert =================
    //user id must exist to create note
    if(!this.userId){
      throw new Meteor.Error('not-authorized to add note');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });

  },
  'notes.remove'(_id){  // remove =================
    if(!this.userId){
      throw new Meteor.Error('not-authorized to remove a note');
    }
    // simpleSchema
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id: _id
    });

    Notes.remove({_id, userId: this.userId});

  },
  'notes.update'(_id, updates) {  // update =================
    if(!this.userId){
      throw new Meteor.Error('not-authorized to remove a note');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Notes.update({_id, userId: this.userId}, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    })
  }

});
