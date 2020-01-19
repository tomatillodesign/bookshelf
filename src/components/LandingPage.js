import React from 'react';
import PropTypes from 'prop-types';

// my components
import Login from './Login';
import Register from './Register';
import Logout from './Logout';


export default function LandingPage(props) {

       return (
            <div className="landing-page-area single-page">
             <h1>Login & New User Registration</h1>
                 <div className="login-register-area">
                 <Login authenticateUser={props.authenticateUser} loginError={props.loginError} />
                 <Register registerNewUser={props.registerNewUser} />
                 <Logout logOutUser={props.logOutUser} />
                 </div>
            </div>

       );
}
