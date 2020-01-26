import React from 'react';
import Router from './Router.js';
import Header from './Header.js';
import base from '../base';
import { firebaseApp } from '../base';



var shortid = require('shortid');

class BookManager extends React.Component {

     constructor(props){
        super(props);
        console.log(this.props.settingsColor);
        this.state = {
             booksToRead: [],
             booksAlreadyRead: [],
             booksToReadView: 'alphabetical',
             booksAlreadyReadView: 'alphabetical',
             settingsColor: 'default',
             settingsFont: 'default',
             settingsTightness: 'default',
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

       base.syncState(`${loggedInID}/settingsColor`, {
         context: this,
         state: 'settingsColor',
         defaultValue: 'default',
         asArray: false
       });

       base.syncState(`${loggedInID}/settingsFont`, {
         context: this,
         state: 'settingsFont',
         defaultValue: 'default',
         asArray: false
       });

       base.syncState(`${loggedInID}/settingsTightness`, {
         context: this,
         state: 'settingsTightness',
         defaultValue: 'default',
         asArray: false
       });

  }


     // Functions to maniuplate state / books
     addBookAlreadyRead = (bookObj) => {
         console.log(bookObj);
         bookObj.bookshelfTimestamp = Date.now();
         bookObj.bookshelfRating = 0;
         bookObj.bookshelfNote = '';
         bookObj.bookshelfCover = null;
         this.setState(prevState => ({
            booksAlreadyRead: [...prevState.booksAlreadyRead, bookObj]
           }));

       }


       addBookToRead = (bookObj) => {
          console.log(bookObj);
          bookObj.bookshelfTimestamp = Date.now();
          bookObj.bookshelfRating = 0;
          bookObj.bookshelfNote = '';
          bookObj.bookshelfCover = null;
          this.setState(prevState => ({
             booksToRead: [...prevState.booksToRead, bookObj]
            }));

        }


        moveBooktoAlreadyRead = (bookObj) => {
           console.log(bookObj);
           bookObj.bookshelfTimestamp = Date.now();
           bookObj.bookshelfRating = 0;
           bookObj.bookshelfCover = null;
           // bookObj.volumeInfo.imageLinks.large = '';                  //new value, image only
           // bookObj.volumeInfo.imageLinks.medium = '';
           // bookObj.volumeInfo.imageLinks.small = '';
           this.setState(prevState => ({
              booksAlreadyRead: [...prevState.booksAlreadyRead, bookObj]
             }));

            console.log("MOVED: " + JSON.stringify(bookObj));
            let bookID = bookObj.id;
            let clbCopyBookState = [...this.state.booksToRead];
            let getBookObjInState = clbCopyBookState.filter(obj => {
             return obj.id === bookID
            });

            let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
            clbCopyBookState.splice(index, 1);

            this.setState({ booksToRead: clbCopyBookState });

         }


       removeBookFromAlreadyRead = (bookObj) => {
          console.log("Removed: " + JSON.stringify(bookObj));
          let bookID = bookObj.id;
          let clbCopyBookState = [...this.state.booksAlreadyRead];
          let getBookObjInState = clbCopyBookState.filter(obj => {
           return obj.id === bookID
          });

          let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
          clbCopyBookState.splice(index, 1);

          this.setState({ booksAlreadyRead: clbCopyBookState });

        }


        removeBookFromToRead = (bookObj) => {
           console.log("Removed: " + JSON.stringify(bookObj));
           let bookID = bookObj.id;
           let clbCopyBookState = [...this.state.booksToRead];
           let getBookObjInState = clbCopyBookState.filter(obj => {
            return obj.id === bookID
           });

           let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
           clbCopyBookState.splice(index, 1);

           this.setState({ booksToRead: clbCopyBookState });

         }


         editBook = (bookObj) => {
            console.log("Editing this book: " + JSON.stringify(bookObj));
               let bookID = bookObj.id;
               let clbCopyBookState = [...this.state.booksAlreadyRead];
               let getBookObjInState = clbCopyBookState.filter(obj => {
                 return obj.id === bookID
               });
               let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
               let ids = [...this.state.booksAlreadyRead];     // create the copy of state array
               ids[index] = bookObj;                  //new value
               console.log(ids[index]);
               this.setState({ booksAlreadyRead: ids });            //update the value

          }



          editBookToRead = (bookObj) => {
            console.log("Editing this book: " + JSON.stringify(bookObj));
               let bookID = bookObj.id;
               let clbCopyBookState = [...this.state.booksToRead];
               let getBookObjInState = clbCopyBookState.filter(obj => {
                 return obj.id === bookID
               });
               let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
               let ids = [...this.state.booksToRead];     // create the copy of state array
               ids[index] = bookObj;                  //new value
               console.log(ids[index]);
               this.setState({ booksToRead: ids });            //update the value

          }



          addNewImagesAlreadyRead = (bookObj) => {
               console.log("Editing this book: " + JSON.stringify(bookObj));
                  let bookID = bookObj.id;
                  let clbCopyBookState = [...this.state.booksAlreadyRead];
                  let getBookObjInState = clbCopyBookState.filter(obj => {
                    return obj.id === bookID
                  });
                  let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
                  let ids = [...this.state.booksAlreadyRead];     // create the copy of state array
                  if( bookObj.volumeInfo.imageLinks.large ) { ids[index].volumeInfo.imageLinks.large = bookObj.volumeInfo.imageLinks.large; } else { ids[index].volumeInfo.imageLinks.large = '' }                 //new value, image only
                  if( bookObj.volumeInfo.imageLinks.medium ) { ids[index].volumeInfo.imageLinks.medium = bookObj.volumeInfo.imageLinks.medium; } else { ids[index].volumeInfo.imageLinks.medium = '' }
                  if( bookObj.volumeInfo.imageLinks.small ) { ids[index].volumeInfo.imageLinks.small = bookObj.volumeInfo.imageLinks.small; } else { ids[index].volumeInfo.imageLinks.small = '' }
                  if( bookObj.volumeInfo.imageLinks.smallThumbnail ) { ids[index].volumeInfo.imageLinks.smallThumbnail = bookObj.volumeInfo.imageLinks.smallThumbnail; } else { ids[index].volumeInfo.imageLinks.smallThumbnail = '' }
                  if( bookObj.volumeInfo.imageLinks.thumbnail ) { ids[index].volumeInfo.imageLinks.thumbnail = bookObj.volumeInfo.imageLinks.thumbnail; } else { ids[index].volumeInfo.imageLinks.thumbnail = '' }
                  console.log(ids[index]);
                  this.setState({ booksAlreadyRead: ids });            //update the value
          }


          addNewImagesToRead = (bookObj) => {
               console.log("Editing this book: " + JSON.stringify(bookObj));
                  let bookID = bookObj.id;
                  let clbCopyBookState = [...this.state.booksToRead];
                  let getBookObjInState = clbCopyBookState.filter(obj => {
                    return obj.id === bookID
                  });
                  let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
                  let ids = [...this.state.booksToRead];     // create the copy of state array
                  if( bookObj.volumeInfo.imageLinks.large ) { ids[index].volumeInfo.imageLinks.large = bookObj.volumeInfo.imageLinks.large; } else { ids[index].volumeInfo.imageLinks.large = ''; }               //new value, image only
                  if( bookObj.volumeInfo.imageLinks.medium ) { ids[index].volumeInfo.imageLinks.medium = bookObj.volumeInfo.imageLinks.medium; } else { ids[index].volumeInfo.imageLinks.medium = ''; }
                  if( bookObj.volumeInfo.imageLinks.small ) { ids[index].volumeInfo.imageLinks.small = bookObj.volumeInfo.imageLinks.small; } else { ids[index].volumeInfo.imageLinks.small = ''; }
                  if( bookObj.volumeInfo.imageLinks.smallThumbnail) { ids[index].volumeInfo.imageLinks.smallThumbnail = bookObj.volumeInfo.imageLinks.smallThumbnail; } else { ids[index].volumeInfo.imageLinks.smallThumbnail = ''; }
                  if( bookObj.volumeInfo.imageLinks.thumbnail) { ids[index].volumeInfo.imageLinks.thumbnail = bookObj.volumeInfo.imageLinks.thumbnail; } else { ids[index].volumeInfo.imageLinks.thumbnail = ''; }
                  console.log(ids[index]);
                  this.setState({ booksToRead: ids });            //update the value
          }


          changeAlreadyReadView = (selectedOption) => {
              // console.log('CHANGE BEER CARD VIEW');
              // console.log(newViewString);

              let newBookCardView = 'alphabetical';
              if(selectedOption) {
                  if( selectedOption.value === 'rating' ) { newBookCardView = 'rating'; }
                  if( selectedOption.value === 'date' ) { newBookCardView = 'date'; }
              }

              this.setState({ booksAlreadyReadView: newBookCardView });

         }



         changeToReadView = (selectedOption) => {

            let newBookCardView = 'alphabetical';
            if(selectedOption) {
                 if( selectedOption.value === 'date' ) { newBookCardView = 'date'; }
            }

            this.setState({ booksToReadView: newBookCardView });

        }



        changeSettingsColor = (selectedOption) => {

           let newSettingsColor = 'default';
           if(selectedOption) {
                newSettingsColor = selectedOption.value;
           }

           this.setState({ settingsColor: newSettingsColor });

       }


       changeSettingsFont = (selectedOption) => {

          let newSettingsFont = 'default';
          if(selectedOption) {
               newSettingsFont = selectedOption.value;
          }

          this.setState({ settingsFont: newSettingsFont });

     }




  render() {

       console.log(this.props.settingsColor);

       const booksAlreadyRead = JSON.stringify(this.state.booksAlreadyRead);
       // console.log(this.props.loggedInID);
       // console.log(this.props.loggedInEmail);
       // console.log(this.addBookAlreadyRead);
       console.log(this.state.booksAlreadyRead);

       return(
            <>
            <Header
               settingsColor={this.state.settingsColor}
               settingsFont={this.state.settingsFont}
            />
            <Router
                 logOutUser={this.props.logOutUser}
                 loggedInID={this.props.loggedInID}
                 loggedInEmail={this.props.loggedInEmail}
                 permanentlyDeleteUserAndInfo={this.props.permanentlyDeleteUserAndInfo}
                 booksAlreadyRead={this.state.booksAlreadyRead}
                 booksAlreadyReadView={this.state.booksAlreadyReadView}
                 booksToReadView={this.state.booksToReadView}
                 changeAlreadyReadView={this.changeAlreadyReadView}
                 changeToReadView={this.changeToReadView}
                 settingsColor={this.state.settingsColor}
                 changeSettingsColor={this.changeSettingsColor}
                 settingsFont={this.state.settingsFont}
                 changeSettingsFont={this.changeSettingsFont}
                 booksToRead={this.state.booksToRead}
                 editBook={this.editBook}
                 editBookToRead={this.editBookToRead}
                 addBookAlreadyRead={this.addBookAlreadyRead}
                 addBookToRead={this.addBookToRead}
                 moveBooktoAlreadyRead={this.moveBooktoAlreadyRead}
                 removeBookFromAlreadyRead={this.removeBookFromAlreadyRead}
                 removeBookFromToRead={this.removeBookFromToRead}
                 addNewImagesAlreadyRead={this.addNewImagesAlreadyRead}
                 addNewImagesToRead={this.addNewImagesToRead}
            />
            <footer className={"clb-bookshelf-footer color-" + this.state.settingsColor + " font-" + this.state.settingsFont}>
              Bookshelf &middot; <a href="https://github.com/tomatillodesign/bookshelf" target="_blank">Version 1.0</a> &middot; By Chris Liu-Beers, <a href="http://tomatillodesign.com" target="_blank">Tomatillo Design</a>
            </footer>
            </>
       );

       }

  }


export default BookManager;
