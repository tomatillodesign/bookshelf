import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';
import EditBookForm from './EditBookForm.js';
import BookButtonRemove from './BookButtonRemove';
import BookButtonMoveToAlreadyRead from './BookButtonMoveToAlreadyRead';
import ReplaceCover from './ReplaceCover';
import Stars from './Stars';
import BookEditor from './BookEditor.js';

import SelectRating from './SelectRating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/pro-light-svg-icons';

export default function BookModal(props) {

     const [show, setShow] = React.useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     let showDescription = false;
     const customToggle = () => {
          showDescription = !showDescription;
     }

     const book = props.book;
     // console.log(book);

     const bookCoverModal = props.bookCoverModal;
     const bookTitleModal = props.bookTitleModal;

     let coverImageURL = null;
     let title = null;
     let subtitle = null;
     let hasSubtitle = false;
     let description = null;
     let authors = null;
     let hasAuthor = false;
     let authorClass = null;
     let categories = null;
     let authorsToPublish = null;
     let dateToPublish = null;
     let date = null;
     let pageCount = null;
     let bookshelfRating = null;
     let bookshelfTimestamp = null;
     let dateCompletedRaw = null;
     let dateCompleted = null;
     let genre = null;
     let showDescriptionIndicator = "+";
     let descriptionToPublish = null;

     //console.log(props.searchResult);
     if( props.searchResult !== undefined ) {
          if( props.description !== '' && props.description !== undefined ) {
          descriptionToPublish = (<div className="saved-for-later-description-area">
                                   <h3 className="saved-for-later-description-headline">Description</h3>
                                        <div className="saved-for-later-text">
                                        {props.description}
                                        </div>
                                   </div>);
          console.log(props.description);
     } else { description = props.book.description; }
     }


     if( props.searchResult !== true ) {

          title = book.title;
          // console.log(title);
          if( book.subtitle !== undefined ) {
               hasSubtitle = true;
               authorClass = " has-subtitle";
               subtitle = <h3 className="book-subtitle">{book.subtitle}</h3>;
          }
          if( book.authors !== undefined ) { authors = book.authors; }

          categories = book.categories;
          date = book.publishedDate;
          pageCount = book.pageCount;
          bookshelfRating = book.bookshelfRating;
          bookshelfTimestamp = book.bookshelfTimestamp;
          dateCompletedRaw = new Date(bookshelfTimestamp);
          dateCompleted = dateCompletedRaw.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"});

          genre = book.genre;
          if( genre === undefined || genre === null ) { genre = 'Not Assigned'; }

          // new image work here
          if( book.coverImg == undefined || book.coverImg == null ) {
               coverImageURL = 'https://firebasestorage.googleapis.com/v0/b/bookshelf-9d11e.appspot.com/o/images%2Foverstory-cover.jpg?alt=media&token=52aa3fae-7968-459b-abab-c71daa39d547';
          } else {
               coverImageURL = book.coverImg;
          }

          if( book.authors !== undefined ) {
               if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
               if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
               if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }

               if( hasSubtitle ) {
                    authorsToPublish = <div className={"authors" + authorClass}>{authorsToPublish}, {pageCount} pages</div>;
               } else {
                    authorsToPublish = <div className="authors">{authorsToPublish}, {pageCount} pages</div>;
               }
          }

          if( date ) {
               let yearOnly = date.toString()
               dateToPublish = 'Date: ' + yearOnly;
          }

     } else {

               if( book.volumeInfo !== undefined ) {

               coverImageURL = props.coverImageURL;

               title = book.volumeInfo.title;
               if( book.volumeInfo.subtitle !== undefined ) {
                    hasSubtitle = true;
                    authorClass = " has-subtitle";
                    subtitle = <h3 className="book-subtitle">{book.volumeInfo.subtitle}</h3>;
               }
               if( book.volumeInfo.authors !== undefined ) { authors = book.volumeInfo.authors; }

               description = book.volumeInfo.description;
               if( description !== undefined ) {
                    if( showDescription === false ) { showDescriptionIndicator = "+"; }
                    else if( showDescription === true ) { showDescriptionIndicator = "–"; }
               }

               categories = book.volumeInfo.categories;
               date = book.volumeInfo.publishedDate;
               pageCount = book.volumeInfo.pageCount;

               if( book.volumeInfo.authors !== undefined ) {
                    if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
                    if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
                    if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }

                    if( hasSubtitle ) {
                         authorsToPublish = <div className={"authors" + authorClass}>{authorsToPublish}, {pageCount} pages</div>;
                    } else {
                         authorsToPublish = <div className="authors">{authorsToPublish}, {pageCount} pages</div>;
                    }
               }

               if( date ) {
                    let yearOnly = date.toString()
                    dateToPublish = 'Date: ' + yearOnly;
               }
          }

     }

     //console.log(props.bookshelfRating);
     let editForm = null;
     if( props.searchResult !== true ) {
          if( props.alreadyRead !== true ) {
               editForm = <EditBookForm
                    book={book}
                    hideRating={true}
                    hideDate={true}
                    bookshelfRating={props.bookshelfRating}
                    bookshelfNote={props.bookshelfNote}
                    bookshelfTimestamp={props.bookshelfTimestamp}
                    editBook={props.editBook}
               />;
          } else if( props.alreadyRead ) {
               editForm = <EditBookForm
                    book={book}
                    bookshelfRating={props.bookshelfRating}
                    bookshelfNote={props.bookshelfNote}
                    bookshelfTimestamp={props.bookshelfTimestamp}
                    editBook={props.editBook}
               />;
          }
     }

     if( bookTitleModal ) {

          if( showDescription === false ) { showDescriptionIndicator = "+"; }
          else if( showDescription === true ) { showDescriptionIndicator = "–"; }

          if( coverImageURL !== null ) {
               //console.log("1-26 Update 1025am - COVER IMG URL: " + coverImageURL);
               if( coverImageURL.startsWith("http://") ) {
                    coverImageURL = coverImageURL.replace("http://", "https://");
                    //console.log("Updated COVER IMG URL: " + coverImageURL);
               }
          }

          return (
            <>
              <button onClick={handleShow} className="card-book-title">
                <h2 className="book-title">{title}</h2>
              </button>

              <Modal show={show} onHide={handleClose} className={"single-book-modal" + " font-" + props.settingsFont + " color-" + props.settingsColor}>
                <Modal.Header closeButton>
                   <Modal.Title className="single-book-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <div className="small-thumbnail-area">
                          <img src={coverImageURL} />
                          {props.searchResult !== true &&
                               <ReplaceCover
                                     bookObj={book}
                                     updateCoverImg={props.updateCoverImg}
                               />
                          }
                     </div>
                     {subtitle}
                     {authorsToPublish}

                     {props.alreadyRead &&
                     <BookEditor
                         book={book}
                         bookshelfRating={props.bookshelfRating}
                         genre={genre}
                         dateCompleted={dateCompleted}
                         useGenres={props.useGenres}
                         useTags={props.useTags}
                         description={props.book.description}
                         setBookRating={props.setBookRating}
                         resetRatingToZero={props.resetRatingToZero}
                         resetTimestampToZero={props.resetTimestampToZero}
                         setBookGenre={props.setBookGenre}
                         genres={props.genres}
                         resetGenreToZero={props.resetGenreToZero}
                         addNewGenre={props.addNewGenre}
                         addNewTag={props.addNewTag}
                         setBookTags={props.setBookTags}
                         tags={props.tags}
                         resetAllTags={props.resetAllTags}
                         setBookTimestamp={props.setBookTimestamp}
                     />
                    }

                    {props.savedForLater &&
                         <div className="saved-for-later-description-area">
                         <h3 className="saved-for-later-description-headline">Description</h3>
                              <div className="saved-for-later-text">
                              {props.book.description}
                              </div>
                         </div>
                    }

                    {props.searchResult &&
                         <>
                         {descriptionToPublish}
                         </>
                    }

                </Modal.Body>
                <Modal.Footer>
                <div className="book-meta button-area">
                { props.alreadyRead &&
                     <BookButtonRemove
                          book={book}
                          context={'removeBookFromAlreadyRead'}
                          removeBookFromAlreadyRead={props.removeBookFromAlreadyRead}
                       />
                }
                { props.savedForLater &&
                     <>
                     <BookButtonRemove
                          book={book}
                          removeBook={props.removeBookFromToRead}
                          context={'removeBookFromToRead'}
                          removeBookFromToRead={props.removeBookFromToRead}
                     />
                     <BookButtonMoveToAlreadyRead
                          book={props.book}
                          moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
                     />
                     </>
                }
                { props.searchResult &&
                     <>
                     <BookButtonToRead
                          book={props.book}
                          addBookToRead={props.addBookToRead}
                     />
                     <BookButtonAlreadyRead
                         book={props.book}
                         addBookAlreadyRead={props.addBookAlreadyRead}
                    />
                     </>
                }
                </div>
                </Modal.Footer>
              </Modal>

            </>
          );

     } else if ( bookCoverModal ) {

          if( coverImageURL !== null ) {
               //console.log("1-26 Update 1025am - COVER IMG URL: " + coverImageURL);
               if( coverImageURL.startsWith("http://") ) {
                    coverImageURL = coverImageURL.replace("http://", "https://");
                    //console.log("Updated COVER IMG URL: " + coverImageURL);
               }
          }

          let additionalModalClasses = null;
          if( props.savedForLater === true ) { additionalModalClasses = " saved-for-later"; }
          if( props.alreadyRead === true ) { additionalModalClasses = " already-read"; }
          if( props.searchResult === true ) { additionalModalClasses = " search-result"; }

          //console.log("DESCRIPTION: " + props.book.description);

          return (
            <>
              <div className="cover-image-area">
                   <button onClick={handleShow} className="card-book-cover"><img src={coverImageURL} className="cover-image" /></button>
              </div>

              <Modal show={show} onHide={handleClose} className={"single-book-modal" + " font-" + props.settingsFont + " color-" + props.settingsColor + additionalModalClasses}>
                <Modal.Header closeButton>
                  <Modal.Title className="single-book-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <div className="small-thumbnail-area">
                          <img src={coverImageURL} />
                          {props.searchResult !== true &&
                               <ReplaceCover
                                    bookObj={book}
                                    updateCoverImg={props.updateCoverImg}
                               />
                          }
                     </div>
                    {subtitle}
                    {authorsToPublish}

                    {props.alreadyRead &&
                    <BookEditor
                         book={book}
                        bookshelfRating={props.bookshelfRating}
                        genre={genre}
                        dateCompleted={dateCompleted}
                        useGenres={props.useGenres}
                        useTags={props.useTags}
                        description={props.book.description}
                        setBookRating={props.setBookRating}
                        resetRatingToZero={props.resetRatingToZero}
                        resetTimestampToZero={props.resetTimestampToZero}
                        setBookGenre={props.setBookGenre}
                        genres={props.genres}
                        resetGenreToZero={props.resetGenreToZero}
                        addNewGenre={props.addNewGenre}
                        addNewTag={props.addNewTag}
                        setBookTags={props.setBookTags}
                        tags={props.tags}
                        resetAllTags={props.resetAllTags}
                        setBookTimestamp={props.setBookTimestamp}
                    />
               }

               {props.savedForLater &&
                    <div className="saved-for-later-description-area">
                    <h3 className="saved-for-later-description-headline">Description</h3>
                         <div className="saved-for-later-text">
                         {props.book.description}
                         </div>
                    </div>
               }

               {props.searchResult &&
                    <>
                    {descriptionToPublish}
                    </>
               }

                </Modal.Body>
                <Modal.Footer>
                <div className="book-meta button-area">
                { props.alreadyRead &&
                     <BookButtonRemove
                         book={book}
                         context={'removeBookFromAlreadyRead'}
                         removeBookFromAlreadyRead={props.removeBookFromAlreadyRead}
                      />
                }
                { props.savedForLater &&
                     <>
                     <BookButtonRemove
                          book={book}
                          removeBook={props.removeBookFromToRead}
                          context={'removeBookFromToRead'}
                          removeBookFromToRead={props.removeBookFromToRead}
                     />
                     <BookButtonMoveToAlreadyRead
                          book={props.book}
                          moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
                     />
                     </>
                }
                { props.searchResult &&
                     <>
                     <BookButtonToRead
                          book={props.book}
                          addBookToRead={props.addBookToRead}
                     />
                     <BookButtonAlreadyRead
                         book={props.book}
                         addBookAlreadyRead={props.addBookAlreadyRead}
                    />
                     </>
                }
                </div>
                </Modal.Footer>
              </Modal>
            </>
          );

     }

}
