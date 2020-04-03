import React from 'react';

const shortid = require('shortid');

export default function AdvancedStats(props) {

     function formatNumber(num) {
          return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

     function getYear(book) {
          const dateObj = new Date( book.bookshelfTimestamp );
          const yearToReturn = dateObj.getFullYear();
          return yearToReturn;
     }

     function getTotalPages(books) {
          let totalPages = 0;
          for( let i = 0; i < books.length; i++ ) {
               totalPages += books[i].pageCount;
          }
          return totalPages.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
     }

     function getAverageRating(books) {

          let starRatingsArray = [];
          for( let i = 0; i < books.length; i++ ) {
               if( books[i].bookshelfRating > 0 ) {
                    starRatingsArray.push(parseInt(books[i].bookshelfRating));
               }
          }
          if( starRatingsArray.length === 0 ) { return(<span className="no-ratings-assigned-message">No ratings assigned</span>); }
          let sum = starRatingsArray.reduce((previous, current) => current += previous);
          let avg = sum / starRatingsArray.length;
          let avgToPublish = avg.toFixed(1);

          return avgToPublish;
     }

       const books = props.books;
       // console.log(props.books);

       // get total pages
       let totalPages = 0;
       let starRatingsArray = [];
       for( let i = 0; i < books.length; i++ ) {
            //console.log(books[i].pageCount);
            totalPages += books[i].pageCount;
            if( books[i].bookshelfRating > 0 ) {
                 //console.log(books[i]);
                 starRatingsArray.push(parseInt(books[i].bookshelfRating));
            }
       }

       // console.log(starRatingsArray);
       let avgToPublish = 'No ratings assigned';
       if( starRatingsArray.length > 0 ) {
            let sum = starRatingsArray.reduce((previous, current) => current += previous);
            // console.log(sum);
            // console.log(starRatingsArray.length);
            let avg = sum / starRatingsArray.length;
            avgToPublish = avg.toFixed(1);
       }


       // get number of books read each year


       // get total books read without any date assigned
       //console.log(books);
       const booksNoDateAssigned = books.filter(function(book) {
                                                         return book.bookshelfTimestamp === 0;
                                                       });
       //console.log(booksNoDateAssigned);




       // loop through remaining books (timestamp > 0) and create groups of books by year
       const booksWithDate = books.filter(function(book) {
                                                         return book.bookshelfTimestamp > 0;
                                                       });
       // re-order the array of books by timestamp
       booksWithDate.sort((a, b) => (a.bookshelfTimestamp < b.bookshelfTimestamp) ? 1 : -1)
       //console.log(booksWithDate);

       let yearlyChart = [];
       let prevDateRaw = new Date( booksWithDate[0].bookshelfTimestamp );
       //console.log(booksWithDate[0].bookshelfTimestamp);
       let prevDateYear = prevDateRaw.getFullYear();
       let currentYearBooks = [];

       for( let j = 0; j < booksWithDate.length; j++ ) {

            let bookDate = new Date(booksWithDate[j].bookshelfTimestamp);
            let currentBookYear = bookDate.getFullYear();

            //currentYearBooks.push(booksWithDate[j]);

            if( j === 0 || currentBookYear !== prevDateYear ) { // USE MAP in line 119 to assign unique keys

                 // create new array, filtered just for this year
                 currentYearBooks = books.filter(function(book) { return getYear(book) === currentBookYear; });
                 // console.log(currentBookYear);
                 // console.log(currentYearBooks);

                 yearlyChart.push(
                      <div className="yearly-chart-area">
                         <h3 className="yearly-summary">{currentBookYear}</h3>
                         <div className="number-of-books">Books read: {currentYearBooks.length}</div>
                         <div className="pages">Approx. pages: {getTotalPages(currentYearBooks)}</div>
                         <div className="average-rating">Average rating: {getAverageRating(currentYearBooks)}</div>
                      </div>
                    );

            }

            if( currentBookYear !== prevDateYear ) {
                 currentYearBooks = [];
            }


       }

       // now end with all the books that don't have a year assigned
       // first check if there are any books with a date === 0
       let booksWithoutDate = [];
       booksWithoutDate = books.filter(function(book) { return book.bookshelfTimestamp === 0; });
       if( booksWithoutDate.length > 0 ) {
       yearlyChart.push(<div className="yearly-chart-area">
                              <h3 className="yearly-summary">No date assigned</h3>
                              <div className="number-of-books">Books read: {booksNoDateAssigned.length}</div>
                              <div className="pages">Approx. pages: {getTotalPages(booksNoDateAssigned)}</div>
                              <div className="average-rating">Average rating: {getAverageRating(booksNoDateAssigned)}</div>
                           </div>);
                      }


       return (
            <div className="advanced-stats-area">
               <h2>Your Reading, by the Numbers</h2>
               <div className="stat-item total-books-read">Total books read: {books.length}</div>
               <div className="stat-item total-pages-read">Approx. total pages read: {getTotalPages(books)}</div>
               <div className="stat-item alltime-avg-stars">All-time average rating: {avgToPublish}</div>
               <div className="stat-item chart-area-all-years">
                    { yearlyChart.map((year) => (
                         <div key={shortid.generate()} className="single-year">{year}</div>
                    ))}</div>
            </div>

       );
}
