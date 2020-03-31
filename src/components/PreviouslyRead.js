import React from 'react';
import BookCard from './BookCard.js';
import SelectAlreadyReadView from './SelectAlreadyReadView';
import AdvancedStats from './AdvancedStats.js';
import SelectFilter from './SelectFilter.js';

var shortid = require('shortid');

class PreviouslyRead extends React.Component {

     constructor(props){
        super(props);
        this.state = {
             bookOrder: this.props.booksAlreadyReadView,
             genreFilter: '',
             tagFilter: '',
             ratingFilter: 0,
             displayedBooks: this.props.booksAlreadyRead,
      };
    }


    orderBooks = ( bookOrderString, booksArray ) => {
         console.log( bookOrderString );
         console.log( booksArray )

         let orderedBooks = null;
         if( bookOrderString === 'alphabetical') {
              orderedBooks = [...booksArray].sort((a, b) => (a.title > b.title) ? 1 : -1);
         }

         if( this.props.booksAlreadyReadView === 'date') {

                   // New sorting
                   orderedBooks = [...booksArray].sort(function (a, b) {

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

         if( this.props.booksAlreadyReadView === 'rating') {

                   // New sorting
                   orderedBooks = [...booksArray].sort(function (a, b) {

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

         return orderedBooks;
    }


    setGenreFilter = ( string ) => {
         console.log("setGenreFilter = " + string);
         this.setState({ genreFilter: string });
    }

    clearGenreFilter = () => {
         console.log("resetGenreFilter");
         this.setState({ genreFilter: '' });
    }




    setTagFilter = ( string ) => {
         console.log("setTagFilter = " + string);
         this.setState({ tagFilter: string });
    }

    clearTagFilter = () => {
         console.log("resetTagFilter");
         this.setState({ tagFilter: '' });
    }




    setRatingFilter = ( number ) => {
         console.log("setRatingFilter = " + number);
         this.setState({ ratingFilter: number });
    }

    clearRatingFilter = () => {
         console.log("resetRatingFilter");
         this.setState({ ratingFilter: 0 });
    }



    clearAllFilters = (e) => {
         e.preventDefault();
         const filteredBooksInOrder = this.orderBooks( this.props.booksAlreadyReadView, this.props.booksAlreadyRead );
         this.setState({
              tagFilter: '',
              genreFilter: '',
              ratingFilter: 0,
              displayedBooks: filteredBooksInOrder
         });
    }



    componentWillMount() {
         const booksAlreadyRead = this.orderBooks( this.props.booksAlreadyReadView, this.props.booksAlreadyRead );
         this.setState({
              displayedBooks: booksAlreadyRead
         });
    }



    render() {


         let booksAlreadyRead = this.props.booksAlreadyRead;
         let displayedBooks = this.state.displayedBooks;
         console.log(booksAlreadyRead);
         console.log(displayedBooks);


         /////////// Getting all of the button resets right and current displayedBooks ///////
         console.log('Rating filter: ' + this.state.ratingFilter);
         console.log('Genre filter: ' + this.state.genreFilter);
         console.log('Tag filter: ' + this.state.tagFilter);

              // Let's do GENRE
              const genre = this.state.genreFilter;
              let filteredBooks = null;
              if( genre !== '' ) {
                   filteredBooks = displayedBooks.filter(function(book) {
                     return book.genre === genre;
                   });

                   // run the re-ordering function to make sure everything is in the correct order
                   displayedBooks = this.orderBooks( this.props.booksAlreadyReadView, filteredBooks );

              }

               // Let's do TAGS
               const tag = this.state.tagFilter;
               if( tag !== '' && tag !== undefined ) {
               filteredBooks = displayedBooks.filter(function(book) {
                  let myBookTags = book.tags;
                  if( myBookTags === undefined ) { console.log("UNDEF"); myBookTags = ''; }
                  console.log(myBookTags);
                  if( book.tags === undefined ) { book.tags = ''; }
                  return myBookTags.includes(tag);
               });

               // run the re-ordering function to make sure everything is in the correct order
               displayedBooks = this.orderBooks( this.props.booksAlreadyReadView, filteredBooks );

               }

               // And Now Rating
               const minRating = this.state.ratingFilter;
               if( minRating !== 0 ) {
                    filteredBooks = displayedBooks.filter(function(book) {
                      return book.bookshelfRating >= minRating;
                    });

               // run the re-ordering function to make sure everything is in the correct order
               displayedBooks = this.orderBooks( this.props.booksAlreadyReadView, filteredBooks );

               }




         let clearButton = null;
         if( this.state.genreFilter !== '' || this.state.tagFilter !== '' || this.state.ratingFilter !== 0 ) {
              clearButton = (<div className="viewer-selector-area clear">
                   <button id="clear-all-filters" className="clear-all-filters" onClick={this.clearAllFilters}>Clear All Filters</button>
              </div>);
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
               <AdvancedStats
                    books={booksAlreadyRead}
               />
               <div className="view-type">
                         <div className="viewer-label">Order by: </div>
                         <div className="viewer-selector-area">
                              <SelectAlreadyReadView
                                   defaultView={this.props.booksAlreadyReadView}
                                   changeAlreadyReadView={this.props.changeAlreadyReadView}
                              />
                    </div>
               </div>
               <div className="view-type">
                         <div className="viewer-label">Filter by: </div>
                         <div className="viewer-selector-area filter">
                              <SelectFilter
                                   books={displayedBooks}
                                   type={"rating"}
                                   currentSelection={this.state.ratingFilter}
                                   setRatingFilter={this.setRatingFilter}
                                   clearRatingFilter={this.clearRatingFilter}
                              />
                         </div>
                         {this.props.useGenres &&
                         <div className="viewer-selector-area filter">
                              <SelectFilter
                                   books={displayedBooks}
                                   type={"genres"}
                                   currentSelection={this.state.genreFilter}
                                   setGenreFilter={this.setGenreFilter}
                                   clearGenreFilter={this.clearGenreFilter}
                              />
                         </div>
                         }
                         {this.props.useTags &&
                         <div className="viewer-selector-area filter">
                              <SelectFilter
                                   books={displayedBooks}
                                   type={"tags"}
                                   currentSelection={this.state.tagFilter}
                                   setTagFilter={this.setTagFilter}
                                   clearTagFilter={this.clearTagFilter}
                              />
                         </div>
                         }
                         {clearButton}
               </div>
                <div className={"results-grid " + this.props.bookSize}>
                {displayedBooks.map((book, index) => (
                     <BookCard
                              key={book.id}
                              book={book}
                              editBook={this.props.editBook}
                              removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                              alreadyRead={true}
                              addNewImagesAlreadyRead={this.props.addNewImagesAlreadyRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                              useGenres={this.props.useGenres}
                              useTags={this.props.useTags}
                              setBookRating={this.props.setBookRating}
                              resetRatingToZero={this.props.resetRatingToZero}
                              resetTimestampToZero={this.props.resetTimestampToZero}
                              setBookGenre={this.props.setBookGenre}
                              genres={this.props.genres}
                              resetGenreToZero={this.props.resetGenreToZero}
                              addNewGenre={this.props.addNewGenre}
                              addNewTag={this.props.addNewTag}
                              setBookTags={this.props.setBookTags}
                              tags={this.props.tags}
                              resetAllTags={this.props.resetAllTags}
                         />
              ))}
              </div>
         </div>
         );

         }

    }

}


export default PreviouslyRead;
