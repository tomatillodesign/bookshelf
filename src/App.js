import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header.js';
import BookManager from './components/BookManager.js';
import LandingPage from './components/LandingPage.js';

import base from './base';
import { firebaseApp } from './base';

class App extends React.Component {
     constructor(props) {
          super(props);

      this.state = {
         loggedInID: '',
         loggedInEmail: '',
         loginError: false,
       };

     }


     componentDidMount() {
          console.log("App.js mounted");
     }



     registerNewUser = (user) => {

             const newUserID = user.user.uid;
             const newUserEmail = user.user.email;
              console.log(newUserID);

             // Create new Journal view if it doesn't exist yet for this user
              firebaseApp.database().ref().update({
                 [newUserID]: {
                      ownerID: newUserID,
                      ownerEmail: newUserEmail,
                      books: [],
                      settings: {
                                   color: 'default',
                                   font: 'default',
                                   sortViewToRead: 'alphabetical',
                                   sortViewAlreadyRead: 'alphabetical',
                                   bookSize: 'default',
                                   genres: [
                                        'Fiction',
                                        'Nonfiction',
                                        'Memoir',
                                        'Children',
                                        'Cooking',
                                        'Historical Fiction',
                                        'Mystery',
                                        'Science Fiction',
                                        'Young Adult',
                                   ],
                                   customFields: [],
                              },
                         },
              });

              this.setState({
                   loggedInID: newUserID,
                   loggedInEmail: newUserEmail,
               });
               localStorage.setItem('bookshelf.loggedInID', newUserID);
               localStorage.setItem('bookshelf.loggedInEmail', newUserEmail);
               console.log("REGISTERED AND Logged in: " + newUserID);

        }


        authenticateUser = (email, password) => {

                 console.log("AuthenticateUser: " + email);
                 // const loggedInID = user.user.uid;

               firebaseApp
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((user) => {
                      console.log("User successfully LOGGED IN" + user.user.uid);
                      this.setState({
                           loggedInID: user.user.uid,
                           loggedInEmail: user.user.email,
                           loginError: false });
                      localStorage.setItem('bookshelf.loggedInID', user.user.uid);
                      localStorage.setItem('bookshelf.loggedInEmail', email);
                    })
                    .catch((error) => {
                      console.log("ERROR: User trying to log in");
                      this.setState({ loginError: true });
                    });

                }



      authHandler = async authData => {

           //console.log(authData);
           const user = firebaseApp.auth().currentUser;

           console.log(user);
           if( user !== null ) {
                const userUID = user.uid;
                console.log("Current User ID: " + userUID);
                console.log("Current User Email: " + user.email);

                //update state
                this.setState({
                     loggedInID: userUID,
                     loggedInEmail: user.email,
                       });
               localStorage.setItem('bookshelf.loggedInID', userUID);
               localStorage.setItem('bookshelf.loggedInEmail', user.email);

           } else {
                console.log("authHandler == no user found");
           }

      }




   logOutUser = event => {

        firebaseApp.auth().signOut().then(function() {
          // Sign-out successful.
          console.log("Logged OUT successful");

        }).catch(function(error) {
          // An error happened.
          console.log("ERROR: Trying to log out");
        });

        //update state
        this.setState({
             loggedInID: '',
             loggedInEmail: '',
          });
        localStorage.removeItem('bookshelf.loggedInID');
        localStorage.removeItem('bookshelf.loggedInEmail');

        base.reset();

   }


   // Delete user not working ????
   permanentlyDeleteUserAndInfo = user => {

        console.log(user);
        const userUID = user.uid;

             base.remove(userUID)
            .then(() => {
              console.log("User " + userUID + " permanently deleted");

            })
            .catch(error => {
              //handle error
            });

            //update state
           this.setState({
                loggedInID: '',
                loggedInEmail: '',
             });
           localStorage.removeItem('bookshelf.loggedInID');
           localStorage.removeItem('bookshelf.loggedInEmail');

       }



     render() {

          let loggedInID = this.state.loggedInID;
          let loggedInEmail = this.state.loggedInEmail;
          const loginError = this.state.loginError;

          const loggedInIDLocal = localStorage.getItem('bookshelf.loggedInID');
          const loggedInEmailLocal = localStorage.getItem('bookshelf.loggedInEmail');
          console.log("LOCAL STORAGE: " + loggedInIDLocal);

          if( loggedInIDLocal !== null ) { loggedInID = loggedInIDLocal; }
          if( loggedInEmailLocal !== null ) { loggedInEmail = loggedInEmailLocal; }

       return (
         <div className="App">

           { loggedInID !== '' ?
               <>
                     <BookManager
                          logOutUser={this.logOutUser}
                          loggedInID={loggedInID}
                          loggedInEmail={loggedInEmail}
                          permanentlyDeleteUserAndInfo={this.permanentlyDeleteUserAndInfo}
                     />
               </>
               :
               <>
                    <Header
                       logOutUser={this.logOutUser}
                       permanentlyDeleteUserAndInfo={this.permanentlyDeleteUserAndInfo}
                    />
                    <div className="logged-out-area">
                       <LandingPage
                              registerNewUser={this.registerNewUser}
                              authenticateUser={this.authenticateUser}
                              loginError={loginError}
                              logOutUser={this.logOutUser}
                         />
                       </div>
             </>
             }

         </div>
       );
     }

}

export default App;
