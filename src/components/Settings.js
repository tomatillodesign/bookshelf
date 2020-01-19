import React from 'react';
import Logout from './Logout.js';

function Settings(props) {
  return (
    <div className="settings-page-area">
      <h1>Settings Page Here</h1>
      <Logout logOutUser={props.logOutUser} />
    </div>
  );
}

export default Settings;
