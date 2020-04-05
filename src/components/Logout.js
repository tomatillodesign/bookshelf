import React from 'react';

const Logout = (props) => {

     return (
          <button type="submit" onClick={props.logOutUser} className="settings-button">Log Out</button>
     );

}

export default Logout;
