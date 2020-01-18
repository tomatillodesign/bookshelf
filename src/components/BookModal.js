import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
          subtitle = book.volumeInfo.subtitle;
          description = book.volumeInfo.description;
          authors = book.volumeInfo.authors;
          categories = book.volumeInfo.categories;
          date = book.volumeInfo.publishedDate;

          if( authors ) { authorsToPublish = 'By ' + authors.join(', '); }

          if( date ) {
               let yearOnly = date.toString()
               dateToPublish = 'Date: ' + yearOnly;
          }
     }

     return (
       <>
         <a href="#" onClick={handleShow}>
           <h2 className="book-title">{title}</h2>
         </a>

         <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>{title}</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <h3>Subtitle: {subtitle}</h3>
               <p>Author: {authors}</p>
               <p>Description: {description}</p>
               <p>Date: {dateToPublish}</p>
           </Modal.Body>
           <Modal.Footer>
             <button onClick={handleClose}>
               Close
             </button>
           </Modal.Footer>
         </Modal>
       </>
     );

}
