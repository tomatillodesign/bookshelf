import React from 'react';
import BookCard from './BookCard.js';

class Results extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          books: [],
          noResults: false,
          notification: this.props.notification,
       };

     }

     componentDidMount() {
          // console.log(this.props);
          // console.log(this.props.location);
          const data = this.props.location.data;
          // console.log(data);
          if (data && data.results.length > 0) {

           this.setState({
             books: data.results.filter((value, index) => index < 40),
           });
         } else {
           this.setState({
             noResults: true
           });
         }

     }

     render() {

          // console.log(this.state.books);
          // console.log(this.props.addBookAlreadyRead);

          let notificationArea = null;
          if( this.state.noResults !== true && this.props.notification ) {

               let currentTimestamp = Date.now();
               if( this.props.notificationTimestamp > currentTimestamp - 1000 ) {
                    notificationArea = ( <div className="notification-area">{this.props.notification}</div> );
               }
          }

       return (
         <div className="results-page-area single-page">
         { notificationArea }
           <h1>Search Results</h1>

           <div className="results-grid">
           {this.state.books.map((book, index) => (
                <BookCard
                         key={book.id}
                         book={book}
                         searchResult={true}
                         addBookAlreadyRead={this.props.addBookAlreadyRead}
                         addBookToRead={this.props.addBookToRead}
                         settingsFont={this.props.settingsFont}
                         settingsColor={this.props.settingsColor}
                         updateCoverImg={this.props.updateCoverImg}
                         useGenres={this.props.useGenres}
                         useTags={this.props.useTags}
                         genres={this.props.genres}
                         tags={this.props.tags}
                         newImprovedEditBook={this.props.newImprovedEditBook}
                    />
          ))}
          </div>
         </div>
       );

     }
}

export default Results;
