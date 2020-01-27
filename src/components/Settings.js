import React from 'react';
import Logout from './Logout.js';
import ChangePassword from './ChangePassword.js';
import DeleteAccount from './DeleteAccount.js';
import SelectThemeColor from './SelectThemeColor.js';
import SelectThemeFont from './SelectThemeFont.js';
import base from '../base';
import { firebaseApp } from '../base';

class Settings extends React.Component {


     constructor(props) {
          super(props);

          this.state = {
              emailedResetLink: false,
            };

     }



     resetPassword = () => {

          var auth = firebaseApp.auth();
          const emailAddress = this.props.loggedInEmail;

          auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            console.log("Reset password email sent");

          }).catch(function(error) {
            // An error happened.
            console.log("ERROR: could not send reset password email");
          });

          this.setState({ emailedResetLink: true });

     }


     deleteAccount = () => {

          var user = firebaseApp.auth().currentUser;

          user.delete().then(function() {
            // User deleted.
            console.log("Current User PERMANENTLY DELETED");
          }).catch(function(error) {
            // An error happened.
            console.log("ERROR: could not delete current user");
          });

          this.props.permanentlyDeleteUserAndInfo(user);

     }


     render() {

          console.log(this.props.settingsFont);


       return (
         <div className="settings-page-area single-page">
           <h1>Settings</h1>
           <div className="color-font-area">
                <div className="select-color-area">
                    <h4>Select Color</h4>
                     <SelectThemeColor
                         settingsColor={this.props.settingsColor}
                         changeSettingsColor={this.props.changeSettingsColor}
                     />
                </div>
                <div className="select-font-area">
                    <h4>Select Font</h4>
                     <SelectThemeFont
                         settingsFont={this.props.settingsFont}
                         changeSettingsFont={this.props.changeSettingsFont}
                     />
                </div>
           </div>
           <p>Currently logged in as: {this.props.loggedInEmail}</p>
           <div className="settings-action-buttons-area">
                <Logout logOutUser={this.props.logOutUser} />
                <ChangePassword resetPassword={this.resetPassword} />
                <DeleteAccount deleteAccount={this.deleteAccount} />
           </div>
         </div>
       );
     }


}

export default Settings;
