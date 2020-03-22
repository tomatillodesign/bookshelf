import React from 'react';


export default function AdvancedStats(props) {

     function formatNumber(num) {
          return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
                 starRatingsArray.push(parseInt(books[i].bookshelfRating));
            }
       }

       // console.log(starRatingsArray);
       let sum = starRatingsArray.reduce((previous, current) => current += previous);
       // console.log(sum);
       let avg = sum / starRatingsArray.length;
       let avgToPublish = avg.toFixed(1);


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
       console.log(booksWithDate);

       let yearlyChart = [];
       let prevDateRaw = new Date( booksWithDate[0].bookshelfTimestamp );
       console.log(booksWithDate[0].bookshelfTimestamp);
       let prevDateYear = prevDateRaw.getFullYear();
       for( let j = 0; j < booksWithDate.length; j++ ) {

            const bookDate = new Date(booksWithDate[j].bookshelfTimestamp);
            const currentBookYear = bookDate.getFullYear();

            if( j === 0 || currentBookYear !== prevDateYear ) {
                 yearlyChart.push(
                      <div className="yearly-chart-area">
                         <h3 className="yearly-summary">{currentBookYear}</h3>
                      </div>
                    );
            }

            

            // if( currentBookYear !== prevDateYear ) {
            //      yearlyChart.push(
            //           <div className="yearly-chart-area">
            //              <h3 className="yearly-summary">{currentBookYear}</h3>
            //           </div>
            //         );
            //      prevDateYear = currentBookYear;
            // }

       }

       // now end with all the books that don't have a year assigned
       yearlyChart.push(<div className="yearly-chart-area">
                              <h3 className="yearly-summary">No date assigned</h3>
                              <div className="number-of-books">Books read: {booksNoDateAssigned.length}</div>
                              <div className="pages">Approx. pages: {getTotalPages(booksNoDateAssigned)}</div>
                              <div className="average-rating">Average rating: {getAverageRating(booksNoDateAssigned)}</div>
                           </div>);


       return (
            <div className="advanced-stats-area">
               <h2>Advanced Stats Here</h2>
               <div className="stat-item total-books-read">Total books read: {books.length}</div>
               <div className="stat-item total-pages-read">Approx. total pages read: {getTotalPages(books)}</div>
               <div className="stat-item alltime-avg-stars">All-time average rating: {avgToPublish}</div>
               <div className="stat-item this-year-avg-stars">{yearlyChart}</div>
            </div>

       );
}
