import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Input from './Input.js';
import API from "../utils/API";
import Results from './Results.js';
import BookCard from './BookCard.js';
import RecommendationsSection from './RecommendationsSection.js';

const shortid = require('shortid');

class Recommended extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          authors: [],
          calculating: true
       };

     }


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


     componentDidMount() {

          console.log( "RECOMMENDED MOUNTED" );
          const books = this.props.books;
          console.log(books);
          const rawAuthors = books.map((book, index) => ( book.authors )).flat();
          const removeDupAuthors = this.removeDuplicates(rawAuthors);
          console.log(rawAuthors);

               let authorsObj = rawAuthors.map((author, index) => {
                    console.log(author);
                     const bookArrayByAuthor = books.filter(book => book.authors.includes(author) && book.alreadyRead === true);
                     console.log(bookArrayByAuthor);
                     let avgRatingForAuthor = this.getAverageRating(bookArrayByAuthor);
                     return { name: author, id: shortid.generate(), books: bookArrayByAuthor, avgRating: avgRatingForAuthor };
               });
               console.log(authorsObj);

               const authorListToPublish = [...authorsObj].filter(author => author.books.length > 0  && author.avgRating > 2 )

                    .sort(function (a, b) {

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

               console.log(authorListToPublish);

               // now select 6 random authors to be highlighted on the suggestion page
               let authorIndices = [];
               for( let i = 0; i < 8; i++ ) {
                    authorIndices.push(Math.floor(Math.random()*authorListToPublish.length));
               }
               console.log(authorIndices);
               console.log(authorListToPublish[2]);
               const recAuthorsRaw = authorIndices.map((arrayIndex, index) =>  authorListToPublish[arrayIndex] );
               console.log(recAuthorsRaw);

               this.setState({
                    authors: recAuthorsRaw,
                    calculating: false
               });

     }


render() {

     const books = this.props.books;
     console.log(this.state.authors);

       return (
         <div className="search-page-area single-page">
           <h1>Ideas for You</h1>
           <p>Recommendations based on your bookshelf</p>
           <p>Searching: {JSON.stringify( this.state.searching )}</p>

           { this.state.calculating === false &&
                <RecommendationsSection
                    authors={this.state.authors}
                    books={books}
                />
           }

         </div>
       );

 }

}

export default Recommended;
