import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Input from './Input.js';

class Search extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
         toResults: false,
       };

     }

     componentDidMount() {
          console.log("Search mounted");
     }

render() {

          if (this.state.toResults) {
           return <Redirect to={{
             pathname: "/results",
             data: { results: this.state.results }
           }} />
         }

       return (
         <div className="search-page-area single-page">
           <h1>Search page here</h1>
           <form id="book-title-search">
                 <Input
                   value={this.state.title}
                   onChange={this.handleInputChange}
                   name="title"
                   label="Book Title"
                   placeholder="Search Book Title (required)"
                 />
                 <button
                   onClick={this.handleFormSubmit}
                   className="btn btn-info"
                 >
                   Search
                 </button>
          </form>
         </div>
       );

 }

}

export default Search;
