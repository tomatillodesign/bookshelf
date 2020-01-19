import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../base';

class Register extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
            email: '',
            password: '',
            error: null,
          };

          console.log(this.props);
     }


handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
   console.log(event.target.value);
 };

handleSubmit = (event) => {
   event.preventDefault();
   console.log('Registration submitted');
   const { email, password } = this.state;
   console.log(this.state);
firebaseApp
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
          //console.log(user);
          //this.props.history.push('/');

          // add new user to App-->state and Firebase
          this.props.registerNewUser(user);
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };

     render() {

          //const classes = useStyles();
          const { email, password, error } = this.state;
          //console.log(this.props.registerNewUser);

          return (
               <div className="login-form-area">
               <h2><div>Enter your information below</div><div>to register for your free Beer Journal:</div></h2>
               {error ? (
                     <div>{error.message}</div>
               ) : null}

               <form id="registration-form" onSubmit={this.handleSubmit}>
                    <div className="registration-area">
                         <input
                             type="text"
                             id="login-form-email"
                             name="email"
                             label="Email"
                             required
                             value={this.email}
                             onChange={this.handleInputChange}
                             />
                        </div>
                        <div className="registration-area">
                             <input
                                 type="text"
                                 id="login-form-password"
                                 name="password"
                                 label="Password"
                                 required
                                 placeholder="Password"
                                 value={this.password}
                                onChange={this.handleInputChange}
                                 />
                       </div>
                       <button type="submit">Register Now</button>
                       </form>
             </div>
          );

     }

}

export default Register;
