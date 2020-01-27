import React from 'react';
import BookCard from './BookCard';

function RecentlyAddedToRead(props) {

     const booksToRead = props.booksToRead;
     let orderedBooks = null;
     // console.log(booksToRead);
     // console.log(booksToRead.length);

      if( booksToRead.length !== 0 && booksToRead !== undefined ) {

           // New sorting
           orderedBooks = [...booksToRead].sort(function (a, b) {

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

           let orderedBooksToPublish = orderedBooks.slice(0, 4);

            return (
                <div className="recently-added-to-read-area">
                    <h2 className="section-title">Up Next</h2>
                         <div className="results-grid four-col">
                        {orderedBooksToPublish.map((book, index) => (
                             <BookCard
                                      key={book.id}
                                      book={book}
                                      editBook={props.editBook}
                                      moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
                                      removeBookFromToRead={props.removeBookFromToRead}
                                      addNewImagesToRead={props.addNewImagesToRead}
                                      savedForLater={true}
                                      toRead={true}
                                      settingsFont={props.settingsFont}
                                      settingsColor={props.settingsColor}
                              />
                      ))}
                      </div>
                </div>
          );

     } else {

          return (
              <div className="recently-added-to-read-area nothing-yet">
                    <p>Time to <a href="/bookshelf/#search">add more books</a> to your shelf!</p>
              </div>
        );

     }
}

export default RecentlyAddedToRead;
