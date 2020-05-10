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

       this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

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

                                 //console.log(res.data.items);

                                 this.setState({
                                      results: [...this.state.results, ...res.data.items ],
                                      searching: false
                                 })
                               })
                               .catch(err => console.log(err));

                       });

                      }

     }


     forceUpdateHandler(){
         this.forceUpdate();
       };


render() {

         console.log(this.props.authors);
         console.log(this.props.removedFromSuggestions);
         const results = this.state.results;
         const authors = this.state.authors;
         const banned = this.props.removedFromSuggestions;

         // filter out any books that Google found that don't match the recommended authors
         const filteredBooksByAuthor = results.filter(function(book) {
              //console.log(book);
              if( book.volumeInfo.authors !== undefined ) {
                   //console.log(book.volumeInfo.authors.indexOf());
                  return book.volumeInfo.authors.some( r => authors.indexOf(r) >= 0);
             } else {
                  return null;
             }
           //return book.volumeInfo.authors;
         });

         // WORK HERE TO REMOVE BOOK DUPLICATES esp by ID
         const currentShelfIDs = this.props.books.map(book => book.id);
         let filteredBooksRemoveDups = filteredBooksByAuthor.filter(function(book) {
                  return !currentShelfIDs.includes(book.id);
         });

         console.log(filteredBooksRemoveDups);

         // WORK HERE TO REMOVE removeBookFromSuggestions by ID
         let removedBanned = filteredBooksRemoveDups.filter(function(book) {
                  return !banned.includes(book.id);
         });
         console.log(removedBanned);


         // WORK HERE TO REMOVE all books that are not in English
         // bookObj.volumeInfo.language !== 'en'
         let removedForeign = removedBanned.filter(function(book) {
              let bookLanguage = '';
              if (book.hasOwnProperty('volumeInfo')) {
                  if (book.volumeInfo.hasOwnProperty('language')) {
                        // do something
                        console.log("Test Remove Languages");
                        console.log( book.volumeInfo.language );
                        bookLanguage = book.volumeInfo.language;
                    }
               }

                return bookLanguage === 'en';
         });
         console.log("removedForeign");
         console.log(removedForeign);


         //filteredBooksRemoveDups = this.removeDuplicates( filteredBooksRemoveDups );
         console.log( filteredBooksByAuthor );
         console.log( filteredBooksRemoveDups );
         console.log( results );
         console.log(filteredBooksByAuthor);

        // const uniqueBooks = Array.from(new Set(filteredBooksByAuthor.map(book => book.id)))
        //    .map(id => {
        //      return filteredBooksByAuthor.find(book => book.id === id)
        // });
        // console.log(uniqueBooks);

        const uniqueBooks = Array.from(new Set(removedForeign.map(book => book.id)))
           .map(id => {
            return removedForeign.find(book => book.id === id)
        });
        console.log(uniqueBooks);


        // now select 24 random books out of the list
        let bookIndices = [];
        console.log(uniqueBooks.length);
        if( uniqueBooks.length > 24 ) {
             while(bookIndices.length < 24) {
                  let index = Math.floor(Math.random()*uniqueBooks.length);
                  if(!bookIndices.includes(index)) { bookIndices.push(index); }
             }
        }

        console.log(bookIndices);
        const finalBooksToPublish = bookIndices.map((arrayIndex, index) =>  uniqueBooks[arrayIndex] );
        console.log(finalBooksToPublish);

        console.log("removedFromSuggestions" + this.props.removedFromSuggestions);

       return (
         <div className="recommendations-page-area single-page">
                <p>More books by authors that you've liked:</p>
               <div className="results-grid">
                    {finalBooksToPublish.map((book, index) => (
                         <BookCard
                                  key={book.id}
                                  book={book}
                                  searchResult={true}
                                  addBookAlreadyRead={this.props.addBookAlreadyRead}
                                  addBookToRead={this.props.addBookToRead}
                                  settingsFont={this.props.settingsFont}
                                  settingsColor={this.props.settingsColor}
                                  removeBookFromSuggestions={this.props.removeBookFromSuggestions}
                             />
                   ))}
              </div>
              { this.state.results &&
                   <button id="more-ideas-refresh" onClick= {this.forceUpdateHandler}>Get More Ideas</button>
              }
         </div>
       );

 }

}

export default RecommendationsSection;
