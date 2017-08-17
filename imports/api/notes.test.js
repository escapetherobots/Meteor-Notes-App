import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';
//=====================================================
//SERVER METHODS ONLY
if(Meteor.isServer){
  describe('Notes', function(){

    //------------------------------------------------------
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My note message',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title 2222',
      body: 'My note message222',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function(){
      // tests use a separate database
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    afterEach(function(){
      // no database methods needed
    });

    //------------------------------------------------------
    it('should insert new note', function(){
      // get any Meteor methods as seen below:
      // call method with: 'notes.insert'.apply()
      // where this is an object with the user id
      const userId = 'testId';
      // the insert method will return an id
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      // then check that a record exists with that id
      expect(Notes.findOne({_id, userId })).toExist();
    });

    //------------------------------------------------------
    it('should not insert new note if not authenticated', function(){
      expect( () => {
        Meteor.server.method_handlers['notes.insert'].apply();
      }).toThrow();
    });

    //------------------------------------------------------
    it('it should remove note', function(){
      // call the remove method
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);

      expect(Notes.findOne({_id: noteOne._id})).toNotExist();
    });

    //------------------------------------------------------
    it('it should not remove if unauthenticated', function(){
      // call the remove method with no user id
      expect( () => {
        Meteor.server.method_handlers['notes.remove'](noteOne._id);
      }).toThrow();

    });

    //------------------------------------------------------
    it('it should throw an error if note _id is not supplied', function(){
      // call the remove method with no user id
      expect( () => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();

    });

    //------------------------------------------------------
    it('it should update note', function(){
      // call the remove method with no user id
      Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId},
        [noteOne._id, {title: "new title zzz", body: "some new note message"}]
      );

      const noteQuery = Notes.findOne({_id: noteOne._id});

      expect(noteQuery.title).toBe("new title zzz");
      expect(noteQuery.updatedAt).toBeGreaterThan(0);
      expect(noteQuery).toInclude({title: "new title zzz", body: "some new note message"});

    });

    //------------------------------------------------------
    it('it should throw an error if extra update props', function(){
      // call the remove method with no user id
      expect( () => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId},
          [noteOne._id, {title: "new title zzz", body: "some new note message", skux: 'life'}]
        );
      }).toThrow();

    });

    //------------------------------------------------------
    it('it should not update if not correct user', function(){
      // call the remove method with no user id
      Meteor.server.method_handlers['notes.update'].apply(
        {userId: "123"},
        [noteOne._id, {title: "something new new new"}]
      );

      const noteQuery = Notes.findOne(noteOne._id);
      expect(noteQuery).toInclude(noteOne);

    });

    //------------------------------------------------------
    it('should not update note if unauthenticated', function(){
      // call the remove method with no user id
      expect( () => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id, {text: "yayaya"}]);
      }).toThrow();

    });

    //------------------------------------------------------
    it('should not update note if _id is invalid', function(){
      // call the remove method with no user id
      expect( () => {
        Meteor.server.method_handlers['notes.update'].apply(
          {userId: noteOne.userId},
          ["12312", {text: "beemo beemo"}]
        );
      }).toThrow();

    });

    //------------------------------------------------------
    it('should return a users notes', function(){
      // this publish_handlers.notes is only a cursor in the DB
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      // call fetch to actually retreive it
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      // check that the only item returned is the noteOne object
      expect(notes[0]).toEqual(noteOne);

    });

    //------------------------------------------------------
    it('should return no notes if incorrect id', function(){
      // this publish_handlers.notes is only a cursor in the DB
      const res = Meteor.server.publish_handlers.notes.apply({userId: "123"});
      // call fetch to actually retreive it
      const notes = res.fetch();

      expect(notes.length).toBe(0);


    });


  });
}
