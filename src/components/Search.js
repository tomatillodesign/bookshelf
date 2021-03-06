import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Input from './Input.js';
import API from "../utils/API";
import Results from './Results.js';

class Search extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
          title: "",
          toResults: false,
          results: []
       };

     }

     componentDidMount() {
          console.log("Search mounted");
     }

     handleInputChange = event => {
          const { name, value } = event.target;
               this.setState({
                    [name]: value
               });
     };

     handleFormSubmit = event => {
          event.preventDefault();
          if (this.state.title) {

               const title = this.state.title.trim();
               console.log(title);

               API.getNewBooks(title)
                  .then(res => {

                    console.log(res.data.items);

                    this.setState({
                      toResults: true,
                      results: res.data.items
                    });
                  })
                  .catch(err => console.log(err));
              }
     }


render() {

          console.log(this.state.title);

          if (this.state.toResults) {
           return <Redirect to={{
             pathname: "/results",
             data: { results: this.state.results }
           }} />
         }

       return (
         <div className="search-page-area single-page">
           <h1>Search for Books</h1>
           <form id="book-title-search">
                 <Input
                   value={this.state.title}
                   onChange={this.handleInputChange}
                   name="title"
                   label="Book Title"
                   placeholder="Search for a book title or author..."
                 />
                 <button
                   onClick={this.handleFormSubmit}
                   className="btn btn-info"
                 >
                   Find It
                 </button>
          </form>

          <div className="recommended-section">
               <button id="show-recommended"><a href="#/recommended">Get Ideas Based on Your Bookshelf</a></button>
          </div>

         </div>
       );

 }

}

export default Search;
