import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';

class BookButtonBanFromSuggestions extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
          }
     }

     componentDidMount() {
     }

     clickRemoveBookSuggested = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          const book = this.props.book;
          console.log(book);
          this.props.removeBookFromSuggestions(book);
     }

     render() {

          return(
               <>
                    <button
                         className="read-action remove-book"
                         title="Don't Suggest this Book Again"
                         onClick={this.clickRemoveBookSuggested}
                    >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
               </>
          );

     }

}

export default BookButtonBanFromSuggestions;
