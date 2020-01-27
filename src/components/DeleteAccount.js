import React from 'react';

const DeleteAccount = (props) => {

     const nowDeleteAccount = (event) => {
          props.deleteAccount();
     }

     return (
          <button
               className="settings-button delete-account"
               type="submit"
               onClick={e =>
            window.confirm(
              "Are you sure you want to permanelty delete your account? All of your information will be removed. You cannot undo this action."
         ) && nowDeleteAccount()
          }>Delete My Account</button>
     );

}

export default DeleteAccount;
