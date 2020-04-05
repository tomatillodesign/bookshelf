import React from 'react';
import BookCard from './BookCard.js';
import SelectToReadView from './SelectToReadView.js';

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
         console.log(this.props);
         console.log(booksToRead);
         //console.log(booksToRead.length);

         let orderedBooks = booksToRead;

               // order these books!
               if( this.props.booksToReadView === 'alphabetical') {
                    orderedBooks = [...booksToRead].sort((a, b) => (a.title > b.title) ? 1 : -1);
               }

               if( this.props.booksToReadView === 'date') {

                         // New sorting
                         orderedBooks = [...booksToRead].sort(function (a, b) {

                         	// If the first item has a higher number, move it down
                         	// If the first item has a lower number, move it up
                         	if (a.bookshelfTimestamp > b.bookshelfTimestamp) return -1;
                         	if (a.bookshelfTimestamp < b.bookshelfTimestamp) return 1;

                         	// If the count number is the same between both items, sort alphabetically
                         	// If the first item comes first in the alphabet, move it up
                         	// Otherwise move it down
                         	if (a.title > b.title) return 1;
               	          if (a.title < b.title) return -1;

                         });

               }

               if( this.props.booksToReadView === 'rating') {

                         // New sorting
                         orderedBooks = [...booksToRead].sort(function (a, b) {

                         	// If the first item has a higher number, move it down
                         	// If the first item has a lower number, move it up
                         	if (a.bookshelfRating > b.bookshelfRating) return -1;
                         	if (a.bookshelfRating < b.bookshelfRating) return 1;

                         	// If the count number is the same between both items, sort alphabetically
                         	// If the first item comes first in the alphabet, move it up
                         	// Otherwise move it down
                         	if (a.title > b.title) return 1;
               	          if (a.title < b.title) return -1;

                         });

               }



       if( booksToRead === undefined || booksToRead.length === 0  ) {

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
      { this.props.notification &&
           <div className="notification-area">{this.props.notification}</div>
      }
           <div className="view-type">
                     <div className="viewer-label">View Your Books by: </div>
                     <div className="viewer-selector-area">
                          <SelectToReadView
                               defaultView={this.props.booksToReadView}
                               changeToReadView={this.props.changeToReadView}
                          />
                </div>
           </div>
           <div className={"results-grid " + this.props.bookSize}>
                {orderedBooks.map((book, index) => (
                     <BookCard
                              key={book.id}
                              book={book}
                              editBook={this.props.editBook}
                              moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              removeBookFromToRead={this.props.removeBookFromToRead}
                              savedForLater={true}
                              toRead={true}
                              addNewImagesToRead={this.props.addNewImagesToRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                              useGenres={this.props.useGenres}
                              updateCoverImg={this.props.updateCoverImg}
                         />
              ))}
         </div>
    </div>
    );

     }

    }

}


export default SavedForLater;
