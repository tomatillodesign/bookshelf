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
          const data = this.props.location.data;
          console.log(data);
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

          console.log(this.state.books);

       return (
         <div className="results-page-area single-page">
           <h1>Results page here</h1>

           <div className="results-grid">
           {this.state.books.map((book, index) => (
                <BookCard
                         key={book.id}
                         book={book}
                    />
          ))}
          </div>
         </div>
       );

     }
}

export default Results;
