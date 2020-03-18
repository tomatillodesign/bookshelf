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

         // set my fields for books in DB
         const newBook = {};

         this.fetchCoverImage(bookObj);

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

       fetchCoverImage = (bookObj) => {
            console.log("FETCH COVER IMAGE");
            console.log(bookObj);
            const selfLink = bookObj.selfLink;
            let coverImageURL = bookObj.volumeInfo.imageLinks.smallThumbnail;

            // Get the details straight from Google, including larger image sizes
                 fetch(selfLink)
                 .then(res => res.json())
                 .then((originalBookJSON) => {

                   console.log('fetchCoverImage CONNECTED');
                   console.log(originalBookJSON);
                   console.log(originalBookJSON.volumeInfo.imageLinks);

                   if( originalBookJSON.volumeInfo.imageLinks.thumbnail !== undefined ) { coverImageURL = originalBookJSON.volumeInfo.imageLinks.thumbnail }
                   if( originalBookJSON.volumeInfo.imageLinks.small !== undefined ) { coverImageURL = originalBookJSON.volumeInfo.imageLinks.small }
                   if( originalBookJSON.volumeInfo.imageLinks.medium !== undefined ) { coverImageURL = originalBookJSON.volumeInfo.imageLinks.medium }
                   if( originalBookJSON.volumeInfo.imageLinks.large !== undefined ) { coverImageURL = originalBookJSON.volumeInfo.imageLinks.large }
                   if( originalBookJSON.volumeInfo.imageLinks.extraLarge !== undefined ) { coverImageURL = originalBookJSON.volumeInfo.imageLinks.extraLarge }

                   console.log(selfLink);
                   console.log("FINAL IMAGE: " + coverImageURL);

                   // update the book object with the new thumbnail cover image
                 const bookID = bookObj.id;
                 const clbCopyBookState = [...this.state.books];
                 const getBookObjInState = clbCopyBookState.filter(obj => {
                   return obj.id === bookID
                 });

                 const bookToUpdate = getBookObjInState[0];
                 console.log(bookToUpdate);
                 bookToUpdate.coverImg = coverImageURL;
                 console.log(bookToUpdate);

                 // REMOVE BOOK
                 let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
                 clbCopyBookState.splice(index, 1);
                 this.setState({ books: clbCopyBookState });

                 // ADD Book with URL
                 this.setState(prevState => ({
                    books: [...prevState.books, bookToUpdate],
                   }));

         });



       }


       addBookToRead = (bookObj) => {
            // set my fields for books in DB
          const newBook = {};

          this.fetchCoverImage(bookObj);

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
          newBook.alreadyRead = false;
          newBook.googleLink = bookObj.selfLink;
          newBook.description = bookObj.volumeInfo.description;
          newBook.publisher = bookObj.volumeInfo.publisher;
          newBook.publishedDate = bookObj.volumeInfo.publishedDate
          newBook.pageCount = bookObj.volumeInfo.pageCount;
          newBook.genre = null;

          console.log(newBook);
          this.setState(prevState => ({
             books: [...prevState.books, newBook],
             notification: 'You added ' + newBook.title + ' to your TO READ shelf'
            }));

            this.startNotificationTimer();

        }


        moveBooktoAlreadyRead = (bookObj) => {

           console.log(bookObj);

           // get the book object
           const bookID = bookObj.id;
           const bookTitle = bookObj.title;
           const clbCopyBookState = [...this.state.books];
           const getBookObjInState = clbCopyBookState.filter(obj => {
            return obj.id === bookID
           });
           console.log(getBookObjInState);

           const index = clbCopyBookState.findIndex(obj => {
            return obj.id === bookID
           });
           console.log(index);

           clbCopyBookState[index].alreadyRead = true;
           this.setState({ books: this.state.books });

         }


       removeBookFromAlreadyRead = (bookObj) => {
          console.log("Removed: " + JSON.stringify(bookObj));
          let bookID = bookObj.id;
          let clbCopyBookState = [...this.state.books];
          let getBookObjInState = clbCopyBookState.filter(obj => {
           return obj.id === bookID
          });

          let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
          clbCopyBookState.splice(index, 1);

          this.setState({ books: clbCopyBookState });

        }


        removeBookFromToRead = (bookObj) => {
           console.log("Removed: " + JSON.stringify(bookObj));
           let bookID = bookObj.id;
           let clbCopyBookState = [...this.state.books];
           let getBookObjInState = clbCopyBookState.filter(obj => {
            return obj.id === bookID
           });

           let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
           clbCopyBookState.splice(index, 1);

           this.setState({ books: clbCopyBookState });

         }


         editBook = (bookObj) => {
            console.log("Editing this book: " + JSON.stringify(bookObj));
               let bookID = bookObj.id;
               let clbCopyBookState = [...this.state.books];
               let getBookObjInState = clbCopyBookState.filter(obj => {
                 return obj.id === bookID
               });
               let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
               let ids = [...this.state.books];     // create the copy of state array
               ids[index] = bookObj;                  //new value
               console.log(ids[index]);

               this.setState({ books: ids });            //update the value

          }

          updateCoverImg = ( bookObj, bookCoverURL ) => {
               console.log(bookObj);
               console.log(bookCoverURL);

               console.log(bookObj);

              //get the book object
              const bookID = bookObj.id;
              const bookTitle = bookObj.title;
              const clbCopyBookState = [...this.state.books];
              const getBookObjInState = clbCopyBookState.filter(obj => {
               return obj.id === bookID
              });
              console.log(getBookObjInState);

              getBookObjInState.coverImg = bookCoverURL;
              // this.setState(prevState => ({
              //   books: [...prevState.books, getBookObjInState],
              //   notification: 'You changed the book cover for ' + bookTitle
              //  }));

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
                  let clbCopyBookState = [...this.state.books];
                  let getBookObjInState = clbCopyBookState.filter(obj => {
                    return obj.id === bookID
                  });
                  let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
                  let ids = [...this.state.books];     // create the copy of state array
                  if( bookObj.volumeInfo.imageLinks.large ) { ids[index].volumeInfo.imageLinks.large = bookObj.volumeInfo.imageLinks.large; } else { ids[index].volumeInfo.imageLinks.large = '' }                 //new value, image only
                  if( bookObj.volumeInfo.imageLinks.medium ) { ids[index].volumeInfo.imageLinks.medium = bookObj.volumeInfo.imageLinks.medium; } else { ids[index].volumeInfo.imageLinks.medium = '' }
                  if( bookObj.volumeInfo.imageLinks.small ) { ids[index].volumeInfo.imageLinks.small = bookObj.volumeInfo.imageLinks.small; } else { ids[index].volumeInfo.imageLinks.small = '' }
                  if( bookObj.volumeInfo.imageLinks.smallThumbnail ) { ids[index].volumeInfo.imageLinks.smallThumbnail = bookObj.volumeInfo.imageLinks.smallThumbnail; } else { ids[index].volumeInfo.imageLinks.smallThumbnail = '' }
                  if( bookObj.volumeInfo.imageLinks.thumbnail ) { ids[index].volumeInfo.imageLinks.thumbnail = bookObj.volumeInfo.imageLinks.thumbnail; } else { ids[index].volumeInfo.imageLinks.thumbnail = '' }
                  console.log(ids[index]);
                  this.setState({ booksAlreadyRead: ids });            //update the value
          }


          addNewImagesToRead = (bookObj) => {
               // console.log("Editing this book: " + JSON.stringify(bookObj));
               //    let bookID = bookObj.id;
               //    let clbCopyBookState = [...this.state.booksToRead];
               //    let getBookObjInState = clbCopyBookState.filter(obj => {
               //      return obj.id === bookID
               //    });
               //    let index = clbCopyBookState.map(function(e) { return e.id; }).indexOf(bookID);
               //    let ids = [...this.state.booksToRead];     // create the copy of state array
               //    if( bookObj.volumeInfo.imageLinks.large ) { ids[index].volumeInfo.imageLinks.large = bookObj.volumeInfo.imageLinks.large; } else { ids[index].volumeInfo.imageLinks.large = ''; }               //new value, image only
               //    if( bookObj.volumeInfo.imageLinks.medium ) { ids[index].volumeInfo.imageLinks.medium = bookObj.volumeInfo.imageLinks.medium; } else { ids[index].volumeInfo.imageLinks.medium = ''; }
               //    if( bookObj.volumeInfo.imageLinks.small ) { ids[index].volumeInfo.imageLinks.small = bookObj.volumeInfo.imageLinks.small; } else { ids[index].volumeInfo.imageLinks.small = ''; }
               //    if( bookObj.volumeInfo.imageLinks.smallThumbnail) { ids[index].volumeInfo.imageLinks.smallThumbnail = bookObj.volumeInfo.imageLinks.smallThumbnail; } else { ids[index].volumeInfo.imageLinks.smallThumbnail = ''; }
               //    if( bookObj.volumeInfo.imageLinks.thumbnail) { ids[index].volumeInfo.imageLinks.thumbnail = bookObj.volumeInfo.imageLinks.thumbnail; } else { ids[index].volumeInfo.imageLinks.thumbnail = ''; }
               //    console.log(ids[index]);
               //    this.setState({ booksToRead: ids });            //update the value
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
      }, 6000);
       }
     }


  render() {

       const books = this.state.books;

       const localStorageKeyColor = 'bookshelf.' + this.props.loggedInID + '.settings.color';
       const settingsColorLocal = localStorage.getItem(localStorageKeyColor);
       const settingsColor = settingsColorLocal;

       const localStorageKeyFont = 'bookshelf.' + this.props.loggedInID + '.settings.font';
       const settingsFontLocal = localStorage.getItem(localStorageKeyFont);
       const settingsFont = settingsFontLocal;


       // run filter operations to separate To Read from Already Read
       const updatedBooksToRead = books.filter(book => book.alreadyRead === false);
       const updatedBooksAlreadyRead = books.filter(book => book.alreadyRead === true);
       console.log(updatedBooksToRead);
       console.log(updatedBooksAlreadyRead);

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
                 booksAlreadyRead={updatedBooksAlreadyRead}
                 booksAlreadyReadView={this.state.settings.sortViewAlreadyRead}
                 booksToReadView={this.state.settings.sortViewToRead}
                 changeAlreadyReadView={this.changeAlreadyReadView}
                 changeToReadView={this.changeToReadView}
                 settingsColor={settingsColor}
                 changeSettingsColor={this.changeSettingsColor}
                 settingsFont={settingsFont}
                 changeSettingsFont={this.changeSettingsFont}
                 booksToRead={updatedBooksToRead}
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
                 updateCoverImg={this.updateCoverImg}
            />
            <footer className={"clb-bookshelf-footer color-" + settingsColor + " font-" + settingsFont}>
              Bookshelf &middot; <a href="https://github.com/tomatillodesign/bookshelf" target="_blank">Version 1.0</a> &middot; By Chris Liu-Beers, <a href="http://tomatillodesign.com" target="_blank">Tomatillo Design</a>
            </footer>
            </>
       );

       }

  }


export default BookManager;
