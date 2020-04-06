import React from 'react';
import BookCard from './BookCard';

function RecentlyAddedAlreadyRead(props) {

     const booksAlreadyRead = props.booksAlreadyRead;
     let orderedBooks = null;
     // console.log(booksToRead);
     // console.log(booksToRead.length);

      if( booksAlreadyRead !== undefined && booksAlreadyRead.length !== 0 ) {

           // New sorting
           orderedBooks = [...booksAlreadyRead].sort(function (a, b) {

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

           let orderedBooksToPublish = orderedBooks.slice(0, 4);

            return (
                <div className="recently-added-already-read-area">
                <h2 className="section-title">Just Finished</h2>
                         <div className="results-grid four-col">
                        {orderedBooksToPublish.map((book, index) => (
                             <BookCard
                                      key={book.id}
                                      book={book}
                                      editBook={props.editBook}
                                      moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
                                      removeBookFromAlreadyRead={props.removeBookFromAlreadyRead}
                                      addNewImagesAlreadyRead={props.addNewImagesAlreadyRead}
                                      alreadyRead={true}
                                      settingsFont={props.settingsFont}
                                      settingsColor={props.settingsColor}
                                      updateCoverImg={props.updateCoverImg}
                                      setBookRating={props.setBookRating}
                                      resetRatingToZero={props.resetRatingToZero}
                                      resetTimestampToZero={props.resetTimestampToZero}
                                      setBookTimestamp={props.setBookTimestamp}
                              />
                      ))}
                      </div>
                </div>
          );

     } else {

          return (
              <div className="recently-added-already-read-area nothing-yet">
              </div>
        );

     }
}

export default RecentlyAddedAlreadyRead;
