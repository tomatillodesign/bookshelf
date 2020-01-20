import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';
import EditBookForm from './EditBookForm.js';

import SelectRating from './SelectRating';

export default function BookModal(props) {

     const [show, setShow] = React.useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const book = props.book;

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
               //coverImageURL = props.book.volumeInfo.imageLinks.thumbnail;
               coverImageURL = book.volumeInfo.imageLinks.large + "&key=AIzaSyDq8sjhqCfhczp_tMSh1pv_WzDQo0eirNU";
               if( book.volumeInfo.imageLinks.large === undefined ) {
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
               {subtitle}
               {authorsToPublish}
               { props.alreadyRead &&
                    <>
                    <EditBookForm
                         book={book}
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
                <BookButtonAlreadyRead />
           }
           { props.savedForLater &&
                <BookButtonAlreadyRead />
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
