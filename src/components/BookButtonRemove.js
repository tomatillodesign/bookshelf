import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-solid-svg-icons';

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
          console.log(this.props.book);
          const bookObj = this.props.book;
          this.props.removeBook(bookObj);

     }

     render() {

          return(

               <button
                    className="read-action remove-book"
                    title="Permanently remove this book from your collection"
                    onClick={this.removeThisBook}
                    >
                    <FontAwesomeIcon icon={faTrashAlt} />
               </button>
          );

     }

}

export default BookButtonRemove;
