import React from 'react';

const shortid = require('shortid');

class AuthorList extends React.Component {

     constructor(props) {
          super(props);

          this.state = {

            };

     }

     // removeDuplicates(array) {
     //   return array.filter((a, b) => array.indexOf(a) === b)
     // };

     removeDuplicates(array) {
       array.splice(0, array.length, ...(new Set(array)))
     };


     getAverageRating(books) {

          let starRatingsArray = [];
          if( starRatingsArray === undefined ) { return null; }
          for( let i = 0; i < books.length; i++ ) {
               if( books[i].bookshelfRating > 0 ) {
                    starRatingsArray.push(parseInt(books[i].bookshelfRating));
               }
          }
          if( starRatingsArray.length === 0 ) { return null; }
          let sum = starRatingsArray.reduce((previous, current) => current += previous);
          let avg = sum / starRatingsArray.length;
          let avgToPublish = avg.toFixed(2);

          return avg;
     }


     render() {

          const books = this.props.books;
          const rawAuthors = books.map((book, index) => ( book.authors )).flat();
          const removeDupAuthors = this.removeDuplicates(rawAuthors);
          console.log(rawAuthors);



               let authorsObj = rawAuthors.map((author, index) => {
                    console.log(author);
                     const bookArrayByAuthor = books.filter(book => book.authors.includes(author));
                     console.log(bookArrayByAuthor);
                     let avgRatingForAuthor = this.getAverageRating(bookArrayByAuthor);
                     return { name: author, id: shortid.generate(), books: bookArrayByAuthor, avgRating: avgRatingForAuthor };
               });
               console.log(authorsObj);

               // re-arrange by author avg rating
               //authorsObj.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : -1);
               // New sorting
               const authorListToPublish = [...authorsObj].sort(function (a, b) {

                    // If the first item has a higher number, move it down
                    // If the first item has a lower number, move it up
                    if (a.avgRating > b.avgRating) return -1;
                    if (a.avgRating < b.avgRating) return 1;

                    // If the count number is the same between both items, sort alphabetically
                    // If the first item comes first in the alphabet, move it up
                    // Otherwise move it down
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;

               });

               // now let's grab our 6 best authors
               


          return(
               <>
               <h2>AuthorList</h2>
               <ul>
                    { authorListToPublish.map((author,index) => ( <li>{author.name} (# books read: {author.books.length} | Avg. rating: {author.avgRating.toFixed(2)}</li> ) ) }
               </ul>
               </>
          );

     }

}

export default AuthorList;
