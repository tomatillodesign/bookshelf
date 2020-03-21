import React from 'react';


export default function AdvancedStats(props) {

     function formatNumber(num) {
          return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
       let avgToPublish = avg.toFixed(2)

       return (
            <div className="advanced-stats-area">
               <h2>Advanced Stats Here</h2>
               <div className="stat-item total-books-read">Total books read: {books.length}</div>
               <div className="stat-item total-pages-read">Approx. total pages read: {formatNumber(totalPages)}</div>
               <div className="stat-item alltime-avg-stars">All-time average rating: {avgToPublish}</div>
               <div className="stat-item this-year-avg-stars"></div>
            </div>

       );
}
