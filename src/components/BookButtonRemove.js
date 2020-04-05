import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';

class BookButtonRemove extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
          }
     }

     componentDidMount() {
     }

     removeThisBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          // console.log(this.props.book);
          // console.log(this.props.context);
          // console.log(this.props.removeBookFromAlreadyRead);
          const bookObj = this.props.book;

          if(this.props.context === 'removeBookFromAlreadyRead') {
               this.props.removeBookFromAlreadyRead(bookObj);
          }

          if(this.props.context === 'removeBookFromToRead') {
               this.props.removeBookFromToRead(bookObj);
          }



     }

     render() {

          return(

               <button
                    className="read-action remove-book"
                    title="Permanently remove this book from your collection"
                    onClick={event =>
                 window.confirm(
                   "Are you sure you want to delete this book? All of your ratings and notes for this book will also be removed. You cannot undo this action."
              ) && this.removeThisBook(event)
               }>
          <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          );

     }

}

export default BookButtonRemove;
