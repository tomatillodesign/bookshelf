import React from 'react';
import Logout from './Logout.js';

function Settings(props) {
  return (
    <div className="settings-page-area single-page">
      <h1>Settings</h1>
      <p>Currently logged in as: {props.loggedInEmail}</p>
      <Logout logOutUser={props.logOutUser} />
    </div>
  );
}

export default Settings;
