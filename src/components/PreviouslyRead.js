import React from 'react';
import BookCard from './BookCard.js';


var shortid = require('shortid');

class PreviouslyRead extends React.Component {

     constructor(props){
        super(props);
        this.state = {
             booksAlreadyRead: [],
             booksAlreadyReadView: '',
      };
    }




    render() {

         const booksAlreadyRead = this.props.booksAlreadyRead;

    return(
    <div className="previously-read-area single-page">
      <h1>Already Read</h1>
           <div className="results-grid">
           {booksAlreadyRead.map((book, index) => (
                <BookCard
                         key={book.id}
                         book={book}
                         editBook={this.props.editBook}
                         removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                         alreadyRead={true}
                    />
         ))}
         </div>
      <div>{this.props.loggedInEmail}</div>
    </div>
    );

    }

}


export default PreviouslyRead;
