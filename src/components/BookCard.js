import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BookModal from './BookModal.js';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';
import BookButtonRemove from './BookButtonRemove.js';
import BookButtonMoveToAlreadyRead from './BookButtonMoveToAlreadyRead';
import Stars from './Stars';

class BookCard extends React.Component {

     constructor(props) {
          super(props);

          this.state = {
               originalBookJSON: null,
               connected: false,
            };

     }

     componentDidMount() {

     // get vars from book
     console.log(this.props.book);

     let selfLink = this.props.book.selfLink;
     console.log(selfLink);

     // Get the details straight from Google, including larger image sizes
     fetch(selfLink)
     .then(res => res.json())
     .then((originalBookJSON) => {
       console.log('Checkout this JSON! ', originalBookJSON);
       //coverImageURL = originalBookJSON.volumeInfo.imageLinks.large;
       if(originalBookJSON.hasOwnProperty('error')) {
            this.setState({
                connected: false
           });
       } else {
            this.setState({
                 originalBookJSON: originalBookJSON,
                 connected: true
            });
       }

     })
     .catch(err => {
          this.setState({
               connected: false
          });
          throw err;
     });

     }

     render() {

          // console.log(this.state.originalBookJSON);
          // console.log(this.state.connected);
          let book = this.state.originalBookJSON;
          let bookJSON = JSON.stringify(book);

          if( this.state.connected === false) {
               book = this.props.book;
          }

          if( book !== null ) {

          let coverImageURL = null;
          let title = null;
          let subtitle = null;
          let authors = null;
          let categories = null;
          let authorsToPublish = null;
          let dateToPublish = null;
          let date = null;

          if( book.volumeInfo !== undefined ) {
               if( book.volumeInfo.imageLinks !== undefined ) {
                    //coverImageURL = props.book.volumeInfo.imageLinks.thumbnail;
                    coverImageURL = book.volumeInfo.imageLinks.large + "&key=AIzaSyDq8sjhqCfhczp_tMSh1pv_WzDQo0eirNU";
                    if( book.volumeInfo.imageLinks.large === undefined ) {
                         coverImageURL = book.volumeInfo.imageLinks.thumbnail;
                    }
               }


               title = book.volumeInfo.title;
               if( book.volumeInfo.subtitle !== undefined ) { subtitle = book.volumeInfo.subtitle; }
               if( book.volumeInfo.authors !== undefined ) { authors = book.volumeInfo.authors; }

               categories = book.volumeInfo.categories;
               date = book.volumeInfo.publishedDate;

               if( book.volumeInfo.authors !== undefined ) {
                    if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
                    if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
                    if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }
               }

               if( date ) {
                    let yearOnly = date.toString()
                    dateToPublish = 'Date: ' + yearOnly;
               }
          }

          // show star ratings
          //console.log(this.props.book.bookshelfRating);
          let bookshelfRating = this.props.book.bookshelfRating;

          //console.log(this.props.removeBookFromAlreadyRead);


          return(

               <div className="book-card">
                    <div className="cover-image-area">
                         <img src={coverImageURL} className="cover-image" />
                    </div>
                    <BookModal
                         book={book}
                         alreadyRead={true}
                         editBook={this.props.editBook}
                         removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                    />
                    <div className="book-meta-area">
                         <div className="book-meta author">{authorsToPublish}</div>
                         <div className="book-meta button-area">
                         { this.props.alreadyRead === true &&
                              <>
                              <Stars bookshelfRating={bookshelfRating} />
                              </>
                         }
                         { this.props.toRead === true &&
                              <>
                              <BookButtonRemove
                                   book={this.props.book}
                                   removeBook={this.props.removeBookFromToRead}
                                   context={'removeBookFromToRead'}
                                   removeBookFromToRead={this.props.removeBookFromToRead}
                              />
                              <BookButtonMoveToAlreadyRead
                                   book={this.props.book}
                                   moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              />
                              </>
                         }
                         { this.props.searchResult === true &&
                              <>
                              <BookButtonToRead
                                   book={this.props.book}
                                   addBookToRead={this.props.addBookToRead}
                              />
                              <BookButtonAlreadyRead
                                   book={this.props.book}
                                   addBookAlreadyRead={this.props.addBookAlreadyRead}
                              />
                              </>
                         }
                         </div>
                    </div>
               </div>

          );

          } else {
          return 'NOT WORKING';
     }

}

}

export default BookCard;
