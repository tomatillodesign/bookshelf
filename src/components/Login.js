import React from 'react';
import LostPassword from './LostPassword';
import Modal from 'react-bootstrap/Modal';
import { firebaseApp } from '../base';
import Register from './Register';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         showModal: false,
         email: '',
         password: '',
         error: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);

  }


  handleShowRegister(event) {
       event.preventDefault();
       this.setState({ showModal: true });
 }

  handleCloseRegister(event) {
       //event.preventDefault();
       this.setState({
            showModal: false
       });
}


  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePWChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.authenticateUser( this.state.email, this.state.password );

  }


  handleRegistrationSubmit = (event) => {
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

     const loginError = this.props.loginError;
     const { email, password, error } = this.state;

     return (

          <div className="login-form-area">
          <p>Welcome! Bookshelf is an easy, free way to keep track of your reading.<br/>
          It's for personal use only and your information will never be shared with advertisers or social networks.<br/>
          If you're new here, <a href="/bookshelf/register" onClick={this.handleShowRegister} >click here to register for a new free account</a>. Or if you've already registered, then simply login below.</p>
          { loginError === true ?
               <h2>Incorrect email/password combination. Please try again:</h2>
               :
               <h2>Login Below:</h2>
          }
          <form className="login-area" onSubmit={this.handleSubmit} >
          <div className="login-item">
               <input
                   type="text"
                   id="login-form-email"
                   name="email"
                   label="Email"
                   required
                   onChange={this.handleEmailChange}
                   />
                   </div>
                   <div className="login-item">
              <input
                  type="text"
                  id="login-form-password"
                  name="password"
                  label="Password"
                  required
                  type="password"
                  onChange={this.handlePWChange}
                  />
             </div>
             <button type="submit">Submit</button>
             </form>
             <LostPassword />


             <Modal show={this.state.showModal} onHide={this.handleCloseRegister} className="clb-single-beer-notes">
               <Modal.Header closeButton>
                 <Modal.Title><h3>Register for a New Account</h3></Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <Register
                         registerNewUser={this.props.registerNewUser}
                    />
               </Modal.Body>
             </Modal>

        </div>
     );

     }

}

export default Login;
