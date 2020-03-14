import React from 'react';
import Router from './Router.js';
import Header from './Header.js';
import base from '../base';
import { firebaseApp } from '../base';



var shortid = require('shortid');

class BookManager extends React.Component {

     constructor(props){
        super(props);
        this.state = {
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
             notification: null
    }

}


    componentDidMount(){

       console.log("componentDidMount");
       const loggedInID = this.props.loggedInID;
       console.log("loggedInID:" + loggedInID);


       // Firebase Connections

       base.syncState(`${loggedInID}/books`, {
         context: this,
         state: 'books',
         asArray: true
       });

       base.syncState(`${loggedInID}/settings`, {
         context: this,
         state: 'settings',
         asArray: false
       });


       // Updating theme data & saving to localStorage
       // Color
       const localStorageKeyColor = 'bookshelf.' + this.props.loggedInID + '.settings.color';
       const settingsColorLocal = localStorage.getItem(localStorageKeyColor);

            base.fetch(`${loggedInID}/settings/color`, {
              context: this,
              asArray: false,
              then(data){
                if( settingsColorLocal !== data ) {
                     console.log("Setting updated color into localStorage: " + data);
                     localStorage.setItem(localStorageKeyColor, data);
                }
              }
            });


       // Updating theme data & saving to localStorage
       // Font
       const localStorageKeyFont = 'bookshelf.' + this.props.loggedInID + '.settings.font';
       const settingsFontLocal = localStorage.getItem(localStorageKeyFont);

            base.fetch(`${loggedInID}/settings/font`, {
              context: this,
              asArray: false,
              then(data){
                   if( settingsFontLocal !== data ) {
                       console.log("Setting updated font into localStorage: " + data);
                       localStorage.setItem(localStorageKeyFont, data);
                  }
              }
            });

  }


     // Functions to maniuplate state / books
     addBookAlreadyRead = (bookObj) => {
         console.log(bookObj);

         // bookObj.bookshelfTimestamp = Date.now();
         // bookObj.bookshelfRating = 0;
         // bookObj.bookshelfNote = '';
         // bookObj.bookshelfCover = null;

         // set my fields for books in DB
         const newBook = {};

         let subtitle = bookObj.volumeInfo.subtitle;
         if( subtitle === undefined ) { subtitle = null; }

         newBook.id = bookObj.id;
         newBook.title = bookObj.volumeInfo.title;
         newBook.subtitle = subtitle;
         newBook.authors = bookObj.volumeInfo.authors;
         newBook.bookshelfTimestamp = Date.now();
         newBook.bookshelfRating = 0;
         newBook.notes = [];
         newBook.coverImg = null;
         newBook.alreadyRead = true;
         newBook.googleLink = bookObj.selfLink;
         newBook.description = bookObj.volumeInfo.description;
         newBook.publisher = bookObj.volumeInfo.publisher;
         newBook.publishedDate = bookObj.volumeInfo.publishedDate
         newBook.pageCount = bookObj.volumeInfo.pageCount;
         newBook.genre = null;

         console.log(newBook);

         let bookTitle = bookObj.volumeInfo.title;
         this.setState(prevState => ({
            books: [...prevState.books, newBook],
            notification: 'You added ' + bookTitle + ' to your ALREADY READ shelf'
           }));

           this.startNotificationTimer();

       }


       addBookToRead = (bookObj) => {
          console.log(bookObj);
          bookObj.bookshelfTimestamp = Date.now();
          bookObj.bookshelfRating = 0;
          bookObj.bookshelfNote = '';
          bookObj.bookshelfCover = null;
          let bookTitle = bookObj.volumeInfo.title;
          this.setState(prevState => ({
             booksToRead: [...prevState.booksToRead, bookObj],
             notification: 'You added ' + bookTitle + ' to your TO READ shelf'
            }));

            this.startNotificationTimer();

        }


        moveBooktoAlreadyRead = (bookObj) => {
           console.log(bookObj);
           bookObj.bookshelfTimestamp = Date.now();
           bookObj.bookshelfRating = 0;
           bookObj.bookshelfCover = null;
           // bookObj.volumeInfo.imageLinks.large = '';                  //new value, image only
           // bookObj.volumeInfo.imageLinks.medium = '';
           // bookObj.volumeInfo.imageLinks.small = '';
           let bookTitle = bookObj.volumeInfo.title;
           this.setState(prevState => ({
              booksAlreadyRead: [...prevState.booksAlreadyRead, bookObj],
              notification: 'You moved ' + bookTitle + ' to your ALREADY READ shelf'
             }));

             this.startNotificationTimer();

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
              console.log('CHANGE sortViewAlreadyRead');
              console.log(selectedOption);

              let sortViewAlreadyRead = 'alphabetical';
              if(selectedOption) {
                  if( selectedOption.value === 'rating' ) { sortViewAlreadyRead = 'rating'; }
                  if( selectedOption.value === 'date' ) { sortViewAlreadyRead = 'date'; }
              }

              this.setState({ settings: {
                         sortViewAlreadyRead: sortViewAlreadyRead
                    }
              });

         }



         changeToReadView = (selectedOption) => {

            let newBookCardView = 'alphabetical';
            if(selectedOption) {
                 if( selectedOption.value === 'date' ) { newBookCardView = 'date'; }
            }

            //this.setState({ booksToReadView: newBookCardView });
            this.setState({ settings: {
                       sortViewToRead: newBookCardView
                  }
            });

        }



        changeSettingsColor = (selectedOption) => {

           let newSettingsColor = 'default';
           if(selectedOption) {
                newSettingsColor = selectedOption.value;
           }

           this.setState({ settings: {
                      color: newSettingsColor
                 }
           });

           const localStorageKey = 'bookshelf.' + this.props.loggedInID + '.settings.color';
           localStorage.setItem(localStorageKey, newSettingsColor);

       }


       changeSettingsFont = (selectedOption) => {

          let newSettingsFont = 'default';
          if(selectedOption) {
               newSettingsFont = selectedOption.value;
          }

          this.setState({ settings: {
                     font: newSettingsFont
               }
          });

          const localStorageKey = 'bookshelf.' + this.props.loggedInID + '.settings.font';
          localStorage.setItem(localStorageKey, newSettingsFont);

     }


     resetNotification = () => {
          this.setState({ notification: null });
     }

     startNotificationTimer = () => {
       if(!this.timerId){
         this.timerId = setTimeout(()=>{
           this.resetNotification();
           console.log("startNotificationTimer - tick");
           console.log(this.timerId);
      }, 8000);
       }
     }


  render() {

       const booksAlreadyRead = JSON.stringify(this.state.booksAlreadyRead);

       const localStorageKeyColor = 'bookshelf.' + this.props.loggedInID + '.settings.color';
       const settingsColorLocal = localStorage.getItem(localStorageKeyColor);
       const settingsColor = settingsColorLocal;

       const localStorageKeyFont = 'bookshelf.' + this.props.loggedInID + '.settings.font';
       const settingsFontLocal = localStorage.getItem(localStorageKeyFont);
       const settingsFont = settingsFontLocal;

       return(
            <>
            <Header
               settingsColor={settingsColor}
               settingsFont={settingsFont}
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
                 settingsColor={settingsColor}
                 changeSettingsColor={this.changeSettingsColor}
                 settingsFont={settingsFont}
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
                 notification={this.state.notification}
            />
            <footer className={"clb-bookshelf-footer color-" + settingsColor + " font-" + settingsFont}>
              Bookshelf &middot; <a href="https://github.com/tomatillodesign/bookshelf" target="_blank">Version 1.0</a> &middot; By Chris Liu-Beers, <a href="http://tomatillodesign.com" target="_blank">Tomatillo Design</a>
            </footer>
            </>
       );

       }

  }


export default BookManager;
