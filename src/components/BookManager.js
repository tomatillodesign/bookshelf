import React from 'react';
import Router from './Router.js';
import base from '../base';
import { firebaseApp } from '../base';



var shortid = require('shortid');

class BookManager extends React.Component {

     constructor(props){
        super(props);
        this.state = {
             booksToRead: [],
             booksAlreadyRead: [],
             booksToReadView: 'Alphabetical',
             booksAlreadyReadView: 'Alphabetical',
             settings: [],
      };
    }


    componentDidMount(){

       console.log("componentDidMount");
       const loggedInID = this.props.loggedInID;
       console.log("loggedInID:" + loggedInID);

       base.syncState(`${loggedInID}/booksToRead`, {
         context: this,
         state: 'booksToRead',
         asArray: true
       });

       base.syncState(`${loggedInID}/booksAlreadyRead`, {
         context: this,
         state: 'booksAlreadyRead',
         asArray: true
       });

       base.syncState(`${loggedInID}/booksToReadView`, {
         context: this,
         state: 'booksToReadView',
         defaultValue: 'Alphabetical',
         asArray: false
       });

       base.syncState(`${loggedInID}/booksAlreadyReadView`, {
         context: this,
         state: 'booksAlreadyReadView',
         defaultValue: 'Alphabetical',
         asArray: false
       });

  }


     // Functions to maniuplate state / books
     addBookAlreadyRead = (newBook) => {
         console.log(newBook);
         this.setState(prevState => ({
            booksAlreadyRead: [...prevState.booksAlreadyRead, newBook]
           }));

       }


       removeBook = (bookObj) => {
          console.log("Removed: " + JSON.stringify(bookObj));
          let beerID = bookObj.id;
          let clbCopyBeerState = [...this.state.booksAlreadyRead];
          let getBeerObjInState = clbCopyBeerState.filter(obj => {
           return obj.id === beerID
          });

          let index = clbCopyBeerState.map(function(e) { return e.id; }).indexOf(beerID);
          clbCopyBeerState.splice(index, 1);

          this.setState({ booksAlreadyRead: clbCopyBeerState });

        }





  render() {

       const booksAlreadyRead = JSON.stringify(this.state.booksAlreadyRead);
       // console.log(this.props.loggedInID);
       // console.log(this.props.loggedInEmail);
       // console.log(this.addBookAlreadyRead);
       console.log(this.state.booksAlreadyRead);

       return(
            <Router
                 logOutUser={this.props.logOutUser}
                 loggedInID={this.props.loggedInID}
                 loggedInEmail={this.props.loggedInEmail}
                 booksAlreadyRead={this.state.booksAlreadyRead}
                 addBookAlreadyRead={this.addBookAlreadyRead}
                 removeBook={this.removeBook}
            />
       );

       }

  }


export default BookManager;
