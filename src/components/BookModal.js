import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BookButtonToRead from './BookButtonToRead.js';
import BookButtonAlreadyRead from './BookButtonAlreadyRead.js';

export default function BookModal(props) {

     const [show, setShow] = React.useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const book = props.book;

     let coverImageURL = null;
     let title = null;
     let subtitle = null;
     let description = null;
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

          description = book.volumeInfo.description;

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
               <h3 className="book-subtitle">{subtitle}</h3>
               <div className="authors">{authorsToPublish}</div>
               <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
           </Modal.Body>
           <Modal.Footer>
           <div className="book-meta button-area">
                <BookButtonToRead />
                <BookButtonAlreadyRead />
           </div>
           </Modal.Footer>
         </Modal>
       </>
     );

}
