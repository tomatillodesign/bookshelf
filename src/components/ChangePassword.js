import React from 'react';

const ChangePassword = (props) => {

     return (
          <button type="submit" onClick={props.resetPassword} className="settings-button">Change Password via Email Link</button>
     );

}

export default ChangePassword;
