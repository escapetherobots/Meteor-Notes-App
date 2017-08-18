import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';


// PRESENTATION COMPONENT (vs container component with class syntax)
const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title={"Super Links App"}/>
      <div className="page-content">
        dashboard content
        <NoteList />
        <Editor />
      </div>
    </div>
  );
};

export default Dashboard;
