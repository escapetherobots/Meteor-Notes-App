import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';


// PRESENTATION COMPONENT (vs container component with class syntax)
const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title={"Super Links App"}/>
      <div className="page-content">
        dashboard content
        <NoteList />
      </div>
    </div>
  );
};

export default Dashboard;
