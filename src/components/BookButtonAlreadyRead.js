import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooksMedical } from '@fortawesome/pro-light-svg-icons';
import { faBookAlt } from '@fortawesome/pro-duotone-svg-icons';

class BookButtonAlreadyRead extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentlyEditing: true,
               typeOfBeer: this.props.typeOfBeer,
               breweryName: this.props.breweryName,
               myRating: this.props.defaultRating
          }
     }

     componentDidMount() {
          if( this.props.typeOfBeer === undefined ) {
               this.setState({
                    typeOfBeer: null,
                    breweryName: null,
                    myRating: null
               });
          }

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
                    <FontAwesomeIcon icon={faBookAlt} />
               </button>
          );

     }

}

export default BookButtonAlreadyRead;
