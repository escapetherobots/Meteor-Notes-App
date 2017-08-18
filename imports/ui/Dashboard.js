import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';
import MyLoader from './MyLoader';


// PRESENTATION COMPONENT (vs container component with class syntax)
const Dashboard = (props) => {
  console.log('current page private?', props.pragePrivate);
  return (
    <div>
      <PrivateHeader title={"Super Links App"}/>
      { props.wait ? <MyLoader /> : undefined}
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  wait: React.PropTypes.bool.isRequired,
  pagePrivate: React.PropTypes.string.isRequired
}

export default createContainer( () => {
  const pagePrivate = Session.get('currentPagePrivacy');
  return {
    wait: true,
    pagePrivate
  }
}, Dashboard);
