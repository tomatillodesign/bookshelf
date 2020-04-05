import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/pro-light-svg-icons';

class BookButtonToRead extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
          }
     }

     componentDidMount() {
     }

     createNewBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          console.log(this.props.book);
          const newBook = this.props.book;
          this.props.addBookToRead(newBook);

     }

     render() {

          return(

               <button
                    className="read-action to-read"
                    title="Add to your To Read shelf"
                    onClick={this.createNewBook}
                    >
                    <FontAwesomeIcon icon={faBook} />
               </button>
          );

     }

}

export default BookButtonToRead;
