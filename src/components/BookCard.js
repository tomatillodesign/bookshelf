import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { faBooksMedical } from '@fortawesome/pro-light-svg-icons';
import BookModal from './BookModal.js';

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

          console.log(this.state.originalBookJSON);
          console.log(this.state.connected);
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
               subtitle = book.volumeInfo.subtitle;
               authors = book.volumeInfo.authors;
               categories = book.volumeInfo.categories;
               date = book.volumeInfo.publishedDate;

               if( authors ) { authorsToPublish = 'By ' + authors.join(', '); }

               if( date ) {
                    let yearOnly = date.toString()
                    dateToPublish = 'Date: ' + yearOnly;
               }
          }

          return(

               <div className="book-card">
                    <div className="cover-image-area">
                         <img src={coverImageURL} className="cover-image" />
                    </div>
                    <BookModal book={book} />
                    <div className="book-meta-area">
                         <div className="book-meta author">{authorsToPublish}</div>
                         <div className="book-meta button-area">
                              <button className="read-action already-read" title="Add to your Already Read shelf"><FontAwesomeIcon icon={faBooksMedical} /></button>
                              <button className="read-action to-read" title="Add to your To Read shelf"><FontAwesomeIcon icon={faBooksMedical} /></button>
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
