import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/pro-duotone-svg-icons';

class BookButtonAlreadyRead extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
          }
     }

     componentDidMount() {
          console.log(this.props.addBookAlreadyRead);
     }

     createNewBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          console.log(this.props.book);
          const newBook = this.props.book;
          this.props.addBookAlreadyRead(newBook);

     }

     render() {

          return(

               <button
                    className="read-action already-read"
                    title="Add to your Already Read shelf"
                    onClick={this.createNewBook}
                    >
                    <FontAwesomeIcon icon={faBook} />
               </button>
          );

     }

}

export default BookButtonAlreadyRead;
