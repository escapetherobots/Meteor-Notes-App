import React from 'react';
import { browserHistory } from 'react-router';


const NotFound = () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>404: Page Not Found</h1>
        <button className="button button--link" onClick={ () => {browserHistory.push('/')}}>Go Home</button>
      </div>
    </div>
  );
};


export default NotFound;
