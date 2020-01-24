import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';
import EditBookForm from './EditBookForm.js';
import BookButtonRemove from './BookButtonRemove';

import SelectRating from './SelectRating';

export default function BookModal(props) {

     const [show, setShow] = React.useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const book = props.book;

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

     if( book.volumeInfo !== undefined ) {
          if( book.volumeInfo.imageLinks !== undefined ) {
               console.log(book.volumeInfo.imageLinks.thumbnail);
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

          title = book.volumeInfo.title;
          if( book.volumeInfo.subtitle !== undefined ) {
               hasSubtitle = true;
               authorClass = " has-subtitle";
               subtitle = <h3 className="book-subtitle">{book.volumeInfo.subtitle}</h3>;
          }
          if( book.volumeInfo.authors !== undefined ) { authors = book.volumeInfo.authors; }

          description = book.volumeInfo.description;

          categories = book.volumeInfo.categories;
          date = book.volumeInfo.publishedDate;

          if( book.volumeInfo.authors !== undefined ) {
               if( authors.length === 1 ) { authorsToPublish = 'By ' + authors; }
               if( authors.length === 2 ) { authorsToPublish = 'By ' + authors.join(' & '); }
               if( authors.length > 2 ) { authorsToPublish = 'By ' + authors.join(', '); }

               if( hasSubtitle ) {
                    authorsToPublish = <div className={"authors" + authorClass}>{authorsToPublish}</div>;
               } else {
                    authorsToPublish = <div className="authors">{authorsToPublish}</div>;
               }
          }

          if( date ) {
               let yearOnly = date.toString()
               dateToPublish = 'Date: ' + yearOnly;
          }
     }

     //console.log(props.bookshelfRating);

     if( bookTitleModal ) {

          return (
            <>
              <button onClick={handleShow} className="card-book-title">
                <h2 className="book-title">{title}</h2>
              </button>

              <Modal show={show} onHide={handleClose} className="single-book-modal">
                <Modal.Header closeButton>
                  <Modal.Title className="single-book-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="small-thumbnail-area">
                         <img src={coverImageURL} />
                    </div>
                    {subtitle}
                    {authorsToPublish}
                    { props.alreadyRead !== true &&
                         <>
                         <EditBookForm
                              book={book}
                              hideRating={true}
                              hideDate={true}
                              bookshelfRating={props.bookshelfRating}
                              bookshelfNote={props.bookshelfNote}
                              bookshelfTimestamp={props.bookshelfTimestamp}
                              editBook={props.editBook}
                         />
                         <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
                        </>
                   }
                    { props.alreadyRead &&
                         <>
                         <EditBookForm
                              book={book}
                              bookshelfRating={props.bookshelfRating}
                              bookshelfNote={props.bookshelfNote}
                              bookshelfTimestamp={props.bookshelfTimestamp}
                              editBook={props.editBook}
                         />
                         <Accordion>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0" className="already-read-description-toggle">
                                <h3>Description</h3>
                              </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
                            </Accordion.Collapse>
                        </Accordion>
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
                     <BookButtonAlreadyRead />
                     </>
                }
                { props.searchResult &&
                     <>
                     <BookButtonToRead />
                     <BookButtonAlreadyRead />
                     </>
                }
                </div>
                </Modal.Footer>
              </Modal>
            </>
          );

     } else if ( bookCoverModal ) {

          return (
            <>
              <div className="cover-image-area">
                   <button onClick={handleShow} className="card-book-cover"><img src={coverImageURL} className="cover-image" /></button>
              </div>

              <Modal show={show} onHide={handleClose} className="single-book-modal">
                <Modal.Header closeButton>
                  <Modal.Title className="single-book-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <div className="small-thumbnail-area">
                          <img src={coverImageURL} />
                     </div>
                    {subtitle}
                    {authorsToPublish}
                    { props.alreadyRead !== true &&
                         <>
                         <EditBookForm
                              book={book}
                              hideRating={true}
                              hideDate={true}
                              bookshelfRating={props.bookshelfRating}
                              bookshelfNote={props.bookshelfNote}
                              bookshelfTimestamp={props.bookshelfTimestamp}
                              editBook={props.editBook}
                         />
                         <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
                        </>
                   }
                    { props.alreadyRead &&
                         <>
                         <EditBookForm
                              book={book}
                              bookshelfRating={props.bookshelfRating}
                              bookshelfNote={props.bookshelfNote}
                              bookshelfTimestamp={props.bookshelfTimestamp}
                              editBook={props.editBook}
                         />
                         <Accordion>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0" className="already-read-description-toggle">
                                <h3>View Description +</h3>
                              </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
                            </Accordion.Collapse>
                        </Accordion>
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
                     <BookButtonAlreadyRead />
                     </>
                }
                { props.searchResult &&
                     <>
                     <BookButtonToRead />
                     <BookButtonAlreadyRead />
                     </>
                }
                </div>
                </Modal.Footer>
              </Modal>
            </>
          );

     }

}