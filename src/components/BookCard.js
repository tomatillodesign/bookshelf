import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import BookModal from './BookModal.js';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';
import BookButtonRemove from './BookButtonRemove.js';
import BookButtonMoveToAlreadyRead from './BookButtonMoveToAlreadyRead';
import BookButtonBanFromSuggestions from './BookButtonBanFromSuggestions.js';
import Stars from './Stars';

class BookCard extends React.Component {

     constructor(props) {
          super(props);

          this.state = {
               originalBookJSON: null,
               connected: false,
               newBookForm: false,
            };

     }


     showNewBookForm = () => {
          this.setState({ newBookForm: true });
     }



     slugify = (text) => {
       return text
         .toString()                     // Cast to string
         .toLowerCase()                  // Convert the string to lowercase letters
         .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
         .trim()                         // Remove whitespace from both sides of a string
         .replace(/\s+/g, '-')           // Replace spaces with -
         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
         .replace(/\-\-+/g, '-');        // Replace multiple - with single -
     }


     render() {

          //console.log(this.props.book);

          // console.log(this.state.originalBookJSON);
          // console.log(this.state.connected);
          let book = this.state.originalBookJSON;
          let bookJSON = JSON.stringify(book);

          if( this.state.connected === false) {
               book = this.props.book;
          }

          if( book !== null ) {

          // let coverImageURL = null;
          let title = null;
          let subtitle = null;
          let authors = null;
          let categories = null;
          let authorsToPublish = null;
          let dateToPublish = null;
          let date = null;
          let description = null;

               title = book.title;
               if( book.subtitle !== undefined ) { subtitle = book.subtitle; }
               if( book.authors !== undefined ) { authors = book.authors; }

               categories = book.categories;
               date = book.publishedDate;

               if( book.authors !== undefined ) {
                    if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
                    if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
                    if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }
               }

               if( date ) {
                    let yearOnly = date.toString()
                    dateToPublish = 'Date: ' + yearOnly;
               }

          // show star ratings
          //console.log(this.props.book.bookshelfRating);
          let bookshelfRating = this.props.book.bookshelfRating;
          let bookshelfNote = this.props.book.bookshelfNote;

          let bookshelfTimestamp = this.props.book.bookshelfTimestamp;
          //console.log(bookshelfTimestamp);

          //console.log(this.props.removeBookFromAlreadyRead);


               // If search results, get the covers straight from Google in correct JSON format
               let coverImageURL = null;
               if( this.props.searchResult ) {

                         description = book.volumeInfo.description;
                         //console.log(description);

                         if( book.volumeInfo !== undefined ) {

                         if( book.volumeInfo.imageLinks !== undefined ) {
                              //console.log(book.volumeInfo.imageLinks.thumbnail);
                              coverImageURL = book.volumeInfo.imageLinks.thumbnail;
                              coverImageURL = book.volumeInfo.imageLinks.large;
                              if( book.volumeInfo.imageLinks.large === undefined || book.volumeInfo.imageLinks.large === '' ) {
                                   coverImageURL = book.volumeInfo.imageLinks.medium;
                              }
                              if( book.volumeInfo.imageLinks.medium === undefined || book.volumeInfo.imageLinks.medium === '' ) {
                                   coverImageURL = book.volumeInfo.imageLinks.small;
                              }
                              if( book.volumeInfo.imageLinks.small === undefined || book.volumeInfo.imageLinks.small === '' ) {
                                   coverImageURL = book.volumeInfo.imageLinks.smallThumbnail;
                              }
                              if( book.volumeInfo.imageLinks.smallThumbnail === undefined ) {
                                   coverImageURL = book.volumeInfo.imageLinks.thumbnail;
                              }
                         }


                         if( book.volumeInfo.authors !== undefined ) {
                              authors = book.volumeInfo.authors;
                              if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
                              if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
                              if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }

                         }

                    }
               }

               let dataGenre = null;
               if( book.genre !== undefined && book.genre !== '' ) {
                    dataGenre = this.slugify(book.genre);
               }

               /////////////////////////////////////////////////////////////////////////////


          return(

               <div className="book-card" id={book.id} data-rating={book.bookshelfRating} data-genre={dataGenre} >
                    <BookModal
                         settingsFont={this.props.settingsFont}
                         settingsColor={this.props.settingsColor}
                         bookCoverModal={true}
                         book={book}
                         alreadyRead={this.props.alreadyRead}
                         savedForLater={this.props.savedForLater}
                         coverImageURL={coverImageURL}
                         addBookToRead={this.props.addBookToRead}
                         addBookAlreadyRead={this.props.addBookAlreadyRead}
                         editBook={this.props.editBook}
                         bookshelfRating={bookshelfRating}
                         bookshelfNote={bookshelfNote}
                         bookshelfTimestamp={bookshelfTimestamp}
                         removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                         removeBookFromToRead={this.props.removeBookFromToRead}
                         searchResult={this.props.searchResult}
                         moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                         updateCoverImg={this.props.updateCoverImg}
                         useGenres={this.props.useGenres}
                         useTags={this.props.useTags}
                         setBookRating={this.props.setBookRating}
                         resetRatingToZero={this.props.resetRatingToZero}
                         resetTimestampToZero={this.props.resetTimestampToZero}
                         setBookGenre={this.props.setBookGenre}
                         genres={this.props.genres}
                         resetGenreToZero={this.props.resetGenreToZero}
                         addNewGenre={this.props.addNewGenre}
                         addNewTag={this.props.addNewTag}
                         setBookTags={this.props.setBookTags}
                         tags={this.props.tags}
                         resetAllTags={this.props.resetAllTags}
                         setBookTimestamp={this.props.setBookTimestamp}
                         description={description}
                         defaultDate={this.props.defaultDate}
                         createNotification={this.props.createNotification}
                         newImprovedEditBook={this.props.newImprovedEditBook}
                    />
                    <BookModal
                         settingsFont={this.props.settingsFont}
                         settingsColor={this.props.settingsColor}
                         bookTitleModal={true}
                         book={book}
                         alreadyRead={this.props.alreadyRead}
                         savedForLater={this.props.savedForLater}
                         coverImageURL={coverImageURL}
                         addBookToRead={this.props.addBookToRead}
                         addBookAlreadyRead={this.props.addBookAlreadyRead}
                         editBook={this.props.editBook}
                         bookshelfRating={bookshelfRating}
                         bookshelfNote={bookshelfNote}
                         bookshelfTimestamp={bookshelfTimestamp}
                         removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                         removeBookFromToRead={this.props.removeBookFromToRead}
                         searchResult={this.props.searchResult}
                         moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                         updateCoverImg={this.props.updateCoverImg}
                         useGenres={this.props.useGenres}
                         useTags={this.props.useTags}
                         setBookRating={this.props.setBookRating}
                         resetRatingToZero={this.props.resetRatingToZero}
                         resetTimestampToZero={this.props.resetTimestampToZero}
                         setBookGenre={this.props.setBookGenre}
                         genres={this.props.genres}
                         resetGenreToZero={this.props.resetGenreToZero}
                         addNewGenre={this.props.addNewGenre}
                         addNewTag={this.props.addNewTag}
                         setBookTags={this.props.setBookTags}
                         tags={this.props.tags}
                         resetAllTags={this.props.resetAllTags}
                         setBookTimestamp={this.props.setBookTimestamp}
                         description={description}
                         defaultDate={this.props.defaultDate}
                         createNotification={this.props.createNotification}
                         newImprovedEditBook={this.props.newImprovedEditBook}
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
                              <BookModal
                                   settingsFont={this.props.settingsFont}
                                   settingsColor={this.props.settingsColor}
                                   bookTitleModal={false}
                                   book={book}
                                   alreadyRead={this.props.alreadyRead}
                                   savedForLater={this.props.savedForLater}
                                   coverImageURL={coverImageURL}
                                   addBookToRead={this.props.addBookToRead}
                                   addBookAlreadyRead={this.props.addBookAlreadyRead}
                                   editBook={this.props.editBook}
                                   bookshelfRating={bookshelfRating}
                                   bookshelfNote={bookshelfNote}
                                   bookshelfTimestamp={bookshelfTimestamp}
                                   removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                                   removeBookFromToRead={this.props.removeBookFromToRead}
                                   searchResult={this.props.searchResult}
                                   moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                                   updateCoverImg={this.props.updateCoverImg}
                                   useGenres={this.props.useGenres}
                                   useTags={this.props.useTags}
                                   setBookRating={this.props.setBookRating}
                                   resetRatingToZero={this.props.resetRatingToZero}
                                   resetTimestampToZero={this.props.resetTimestampToZero}
                                   setBookGenre={this.props.setBookGenre}
                                   genres={this.props.genres}
                                   resetGenreToZero={this.props.resetGenreToZero}
                                   addNewGenre={this.props.addNewGenre}
                                   addNewTag={this.props.addNewTag}
                                   setBookTags={this.props.setBookTags}
                                   tags={this.props.tags}
                                   resetAllTags={this.props.resetAllTags}
                                   setBookTimestamp={this.props.setBookTimestamp}
                                   description={description}
                                   createNotification={this.props.createNotification}
                                   defaultDate={this.props.defaultDate}
                                   newBookForm={true}
                                   newImprovedEditBook={this.props.newImprovedEditBook}
                              />
                              </>
                         }
                         { this.props.searchResult === true &&
                              <>

                              {this.props.removeBookFromSuggestions &&
                                   <BookButtonBanFromSuggestions
                                        book={this.props.book}
                                        removeBookFromSuggestions={this.props.removeBookFromSuggestions}
                                   />
                              }
                              <BookButtonToRead
                                   book={this.props.book}
                                   addBookToRead={this.props.addBookToRead}
                              />
                              <BookModal
                                   settingsFont={this.props.settingsFont}
                                   settingsColor={this.props.settingsColor}
                                   bookTitleModal={false}
                                   book={book}
                                   alreadyRead={this.props.alreadyRead}
                                   savedForLater={this.props.savedForLater}
                                   coverImageURL={coverImageURL}
                                   addBookToRead={this.props.addBookToRead}
                                   addBookAlreadyRead={this.props.addBookAlreadyRead}
                                   editBook={this.props.editBook}
                                   bookshelfRating={bookshelfRating}
                                   bookshelfNote={bookshelfNote}
                                   bookshelfTimestamp={bookshelfTimestamp}
                                   removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                                   removeBookFromToRead={this.props.removeBookFromToRead}
                                   searchResult={this.props.searchResult}
                                   moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                                   updateCoverImg={this.props.updateCoverImg}
                                   useGenres={this.props.useGenres}
                                   useTags={this.props.useTags}
                                   setBookRating={this.props.setBookRating}
                                   resetRatingToZero={this.props.resetRatingToZero}
                                   resetTimestampToZero={this.props.resetTimestampToZero}
                                   setBookGenre={this.props.setBookGenre}
                                   genres={this.props.genres}
                                   resetGenreToZero={this.props.resetGenreToZero}
                                   addNewGenre={this.props.addNewGenre}
                                   addNewTag={this.props.addNewTag}
                                   setBookTags={this.props.setBookTags}
                                   tags={this.props.tags}
                                   resetAllTags={this.props.resetAllTags}
                                   setBookTimestamp={this.props.setBookTimestamp}
                                   description={description}
                                   createNotification={this.props.createNotification}
                                   newBookForm={true}
                                   defaultDate={this.props.defaultDate}
                                   newImprovedEditBook={this.props.newImprovedEditBook}
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
