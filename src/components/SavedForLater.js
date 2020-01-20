import React from 'react';
import BookCard from './BookCard.js';


var shortid = require('shortid');

class SavedForLater extends React.Component {

     constructor(props){
        super(props);
        this.state = {
             booksToRead: [],
             booksToReadView: '',
      };
    }




    render() {

         const booksToRead = this.props.booksToRead;
         console.log(booksToRead);
         console.log(booksToRead.length);

       if( booksToRead.length === 0 || booksToRead === undefined ) {

                return(
                <div className="saved-for-later-area single-page">
                  <h1>To Read</h1>
                       <p className="no-books-yet-message">You don't have any books saved for later. But you can <a href="/search">run a search</a> and start adding books!</p>
                  <div>{this.props.loggedInEmail}</div>
                </div>
                );

           } else {

    return(
    <div className="saved-for-later-area single-page">
      <h1>To Read</h1>
           <div className="results-grid">
                {booksToRead.map((book, index) => (
                     <BookCard
                              key={book.id}
                              book={book}
                              moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              removeBookFromToRead={this.props.removeBookFromToRead}
                              toRead={true}
                         />
              ))}
         </div>
      <div>{this.props.loggedInEmail}</div>
    </div>
    );

     }

    }

}


export default SavedForLater;
