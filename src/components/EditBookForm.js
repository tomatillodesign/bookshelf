import React from 'react';
import Select from 'react-select';
//import Notes from './Notes';
import SelectRating from './SelectRating';

///////////////////////////////////////////////////////////////////////


class EditBookForm extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentlyEditing: true,
               book: this.props.book,
               bookshelfNote: this.props.bookshelfNote,
               bookshelfRating: this.props.bookshelfRating
          }
     }



     id = this.props.book.id;
     bookshelfRating = this.props.book.bookshelfRating;


     editThisBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          const book = this.state.book;

          // Make sure no fields cause "undefined" errors even if missing info
               // if( this.count === undefined ) { this.count = 0; }
               // if( this.type_of_beer === undefined ) { this.type_of_beer = ''; }
               // if( this.brewery_name === undefined ) {
               //      this.brewery_name = '';
               //      this.brewery_slug = '';
               // }

               if( this.bookshelfTimestamp === undefined ) { this.bookshelfTimestamp = ''; }
               if( this.bookshelfRating === undefined ) { this.bookshelfRating = 0; }

               book.bookshelfRating = this.bookshelfRating;
               const entry = book;

          // console.log(entry);
          // console.log(this.props.editCurrentBeer);
          // 2 add the new beer to state (App.js)
          this.props.editBook(entry);
          // refresh the form
          event.currentTarget.reset();

          // this.setState({
          //      currentlyEditing: false,
          //      book: null,
          //      bookshelfNote: null,
          //      bookshelfRating: null
          // });

     }

     // getBeerName = (event) => {
     //      this.beerName = (event.target.value);
     //      //console.log(this.beerName);
     // }
     //
     // getBeerDescription = (event) => {
     //      this.beerNotes = (event.target.value);
     // }
     //
     // getABV = (event) => {
     //      this.beerABV = (event.target.value);
     // }
     //
     // getEntryDate = (date) => {
     //      this.entryDate = date;
     //      //console.log("ENTRY DATE: " + this.entryDate);
     // }
     //
     // getTypeOfBeer = (selectedOption) => {
     //      //console.log('getTypeOfBeer');
     //      if(selectedOption) {
     //           this.type_of_beer = selectedOption.label;
     //           this.props.addNewTypeOfBeer(selectedOption.label);
     //           this.setState({ typeOfBeer: selectedOption.label });
     //      } else {
     //           this.type_of_beer = '';
     //           this.setState({ typeOfBeer: null });
     //      }
     // }
     //
     // getBrewery = (selectedOption) => {
     //      //console.log('getBrewery');
     //      if(selectedOption) {
     //           this.brewery_slug = slugify(selectedOption.label);
     //           this.brewery_name = selectedOption.label;
     //           this.setState({ breweryName: selectedOption.label });
     //      } else {
     //           this.setState({ breweryName: null });
     //      }
     //
     // }

     setRating = (selectedOption) => {
          if(selectedOption) {
               this.bookshelfRating = selectedOption.value;
               this.setState({ bookshelfRating: selectedOption.value });
          } else {
               this.setState({ bookshelfRating: null });
          }

     }


render() {

     // console.log("Current book: " + JSON.stringify(this.props.book));
     // console.log("Current book RATING: " + JSON.stringify(this.props.book.bookshelfRating));

       return (
            <>

            <form className="edit-book" onSubmit={this.editThisBook} >
               <SelectRating
                    setRating={this.setRating}
                    defaultRating={this.props.book.bookshelfRating}
               />
               <button type="submit">Update this Book</button>
            </form>
         </>
       );
     }

}


export default EditBookForm;
