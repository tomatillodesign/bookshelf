import React from 'react';
import BookCard from './BookCard.js';

class Results extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          books: [],
          noResults: false
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

       return (
         <div className="results-page-area single-page">
         { this.props.notification &&
              <div className="notification-area">{this.props.notification}</div>
         }
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
                    />
          ))}
          </div>
         </div>
       );

     }
}

export default Results;
