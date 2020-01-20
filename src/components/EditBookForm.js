import React from 'react';
import Select from 'react-select';
//import Notes from './Notes';
import SelectRating from './SelectRating';
import Notes from './Notes';
import ReadDate from './ReadDate';

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
     bookshelfRating = this.props.bookshelfRating;
     bookNotes = this.props.bookshelfNote;
     bookshelfTimestamp = this.props.bookshelfTimestamp;


     editThisBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          const book = this.state.book;
          console.log(book);

          // Make sure no fields cause "undefined" errors even if missing info
               // if( this.count === undefined ) { this.count = 0; }
               // if( this.type_of_beer === undefined ) { this.type_of_beer = ''; }
               // if( this.brewery_name === undefined ) {
               //      this.brewery_name = '';
               //      this.brewery_slug = '';
               // }

               console.log(this.state.book.bookshelfRating);

               if( this.bookshelfTimestamp === undefined ) { this.bookshelfTimestamp = this.state.book.bookshelfTimestamp; }
               if( this.bookshelfRating === undefined ) { this.bookshelfRating = this.state.book.bookshelfRating; }
               if( this.bookNotes === undefined ) { this.bookNotes = this.state.book.bookshelfNote; }

               book.bookshelfRating = this.bookshelfRating;
               book.bookshelfNote = this.bookNotes;
               book.bookshelfTimestamp = this.bookshelfTimestamp;
               const entry = book;

          console.log(entry);
          // console.log(this.props.editCurrentBeer);
          // 2 add the new beer to state (App.js)
          this.props.editBook(entry);

     }

     setRating = (selectedOption) => {
          if(selectedOption) {
               this.bookshelfRating = selectedOption.value;
               this.setState({ bookshelfRating: selectedOption.value });
          }
          else {
               this.setState({ bookshelfRating: 505 });
          }

     }

     setNotes = (event) => {
          this.bookNotes = (event.target.value);
     }

     getCompletedDate = (date) => {
          this.bookshelfTimestamp = date;
          console.log("Completed DATE: " + this.bookshelfTimestamp);
     }


render() {

     console.log("Current book: " + JSON.stringify(this.props.book));
     console.log("Current book RATING: " + JSON.stringify(this.props.bookshelfRating));
     const defaultRating = this.props.bookshelfRating;
     const bookshelfNote = this.props.bookshelfNote;
     const bookshelfTimestamp = this.props.bookshelfTimestamp;
     console.log("NOTE: " + bookshelfNote);

       return (
            <>

            <form className="edit-book" onSubmit={this.editThisBook} >
            { this.props.hideRating !== true &&
               <SelectRating
                    setRating={this.setRating}
                    defaultRating={defaultRating}
               />
          }
          { this.props.hideDate !== true &&
               <ReadDate
                    bookshelfTimestamp={bookshelfTimestamp}
                    getCompletedDate={this.getCompletedDate}
               />
          }
               <Notes
                    placeholder={'Add a note...'}
                    defaultValue={bookshelfNote}
                    setNotes={this.setNotes}
               />
               <button type="submit">Update this Book</button>
            </form>
         </>
       );
     }

}


export default EditBookForm;
