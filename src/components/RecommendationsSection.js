import React from 'react';
import API from "../utils/API";
import Results from './Results.js';
import BookCard from './BookCard.js';

const shortid = require('shortid');

class RecommendationsSection extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          authors: this.props.authors,
          results: [],
          searching: true,
       };

     }

     componentDidMount() {

                  const authorsRaw = this.props.authors;
                  //let authors = authorsObj.map(author => author.name);
                  console.log("RecommendationsSection mounted");
                  console.log(authorsRaw);

                  const authors = authorsRaw.map( author => ( author.name ));
                  this.setState({ authors: authors });
                  console.log(authors);

                  if (authors) {

                       authors.forEach(author => {

                            console.log( author );
                            this.setState({ searching: true });

                            API.getNewBooks(author)
                               .then(res => {

                                 console.log(res.data.items);

                                 this.setState({
                                      results: [...this.state.results, ...res.data.items ],
                                      searching: false
                                 })
                               })
                               .catch(err => console.log(err));

                       });

                      }



     }




render() {

         console.log(this.props.authors);
         const results = this.state.results;
         const authors = this.state.authors;

         // filter out any books that Google found that don't match the recommended authors
         const filteredBooksByAuthor = results.filter(function(book) {
              console.log(book);
              if( book.volumeInfo.authors !== undefined ) {
                   console.log(book.volumeInfo.authors.indexOf());
                  return book.volumeInfo.authors.some( r => authors.indexOf(r) >= 0);
             } else {
                  return null;
             }
           //return book.volumeInfo.authors;
         });

         // WORK HERE TO REMOVE BOOK DUPLICATES esp by ID
         const currentShelfIDs = this.props.books.map(book => book.id);
         const filteredBooksRemoveDups = filteredBooksByAuthor.filter(function(book) {
                  return !currentShelfIDs.includes(book.id);
         });

         console.log(results);
         console.log(filteredBooksByAuthor);
         console.log(filteredBooksRemoveDups);
         console.log(currentShelfIDs);



       return (
         <div className="search-page-area single-page">
           <h1>Ideas for You</h1>
           <p>Recommendations based on your bookshelf</p>
           <p>Searching: {JSON.stringify( this.state.searching )}</p>

          <h3>Results</h3>

          <div className="results-grid">
               {filteredBooksRemoveDups.map((book, index) => (
                    <BookCard
                             key={book.id}
                             book={book}
                             searchResult={true}
                             addBookAlreadyRead={this.props.addBookAlreadyRead}
                             addBookToRead={this.props.addBookToRead}
                             settingsFont={this.props.settingsFont}
                             settingsColor={this.props.settingsColor}
                        />
              ))}
         </div>
         </div>
       );

 }

}

export default RecommendationsSection;
