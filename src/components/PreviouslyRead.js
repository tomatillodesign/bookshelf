import React from 'react';
import BookCard from './BookCard.js';
import SelectAlreadyReadView from './SelectAlreadyReadView';

var shortid = require('shortid');

class PreviouslyRead extends React.Component {

     constructor(props){
        super(props);
        this.state = {
             // booksAlreadyRead: [],
             // booksAlreadyReadView: '',
      };
    }




    render() {

         const booksAlreadyRead = this.props.booksAlreadyRead;
         console.log(booksAlreadyRead);

         console.log(this.props.booksAlreadyReadView);
         let orderedBooks = null;

               // order these books!
               if( this.props.booksAlreadyReadView === 'alphabetical') {
                    orderedBooks = [...booksAlreadyRead].sort((a, b) => (a.volumeInfo.title > b.volumeInfo.title) ? 1 : -1);

               }

               if( this.props.booksAlreadyReadView === 'date') {

                         // New sorting
                         orderedBooks = [...booksAlreadyRead].sort(function (a, b) {

                         	// If the first item has a higher number, move it down
                         	// If the first item has a lower number, move it up
                         	if (a.bookshelfTimestamp > b.bookshelfTimestamp) return -1;
                         	if (a.bookshelfTimestamp < b.bookshelfTimestamp) return 1;

                         	// If the count number is the same between both items, sort alphabetically
                         	// If the first item comes first in the alphabet, move it up
                         	// Otherwise move it down
                         	if (a.volumeInfo.title > b.volumeInfo.title) return 1;
               	          if (a.volumeInfo.title < b.volumeInfo.title) return -1;

                         });

               }

               if( this.props.booksAlreadyReadView === 'rating') {

                         // New sorting
                         orderedBooks = [...booksAlreadyRead].sort(function (a, b) {

                         	// If the first item has a higher number, move it down
                         	// If the first item has a lower number, move it up
                         	if (a.bookshelfRating > b.bookshelfRating) return -1;
                         	if (a.bookshelfRating < b.bookshelfRating) return 1;

                         	// If the count number is the same between both items, sort alphabetically
                         	// If the first item comes first in the alphabet, move it up
                         	// Otherwise move it down
                         	if (a.volumeInfo.title > b.volumeInfo.title) return 1;
               	          if (a.volumeInfo.title < b.volumeInfo.title) return -1;

                         });

               }





         if( booksAlreadyRead === undefined || booksAlreadyRead.length === 0 ) {

                  return(
                  <div className="previously-read-area single-page">
                    <h1>Already Read</h1>
                         <p className="no-books-yet-message">You haven't recorded any books yet. But you can <a href="/search">run a search</a> and start adding books!</p>
                    <div>{this.props.loggedInEmail}</div>
                  </div>
                  );

             } else {

         return(
         <div className="previously-read-area single-page">
           <h1>Already Read</h1>
               <div className="view-type">
                         <div className="viewer-label">View Your Books by: </div>
                         <div className="viewer-selector-area">
                              <SelectAlreadyReadView
                                   defaultView={this.props.booksAlreadyReadView}
                                   changeAlreadyReadView={this.props.changeAlreadyReadView}
                              />
                    </div>
               </div>
                <div className="results-grid">
                {orderedBooks.map((book, index) => (
                     <BookCard
                              key={book.id}
                              book={book}
                              editBook={this.props.editBook}
                              removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                              alreadyRead={true}
                              addNewImagesAlreadyRead={this.props.addNewImagesAlreadyRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                         />
              ))}
              </div>
         </div>
         );

         }

    }

}


export default PreviouslyRead;
