import React from 'react';
import Select from 'react-select';
import SelectRating from './SelectRating';
import ReadDate from './ReadDate';
import SelectGenre from './SelectGenre';
import SelectTags from './SelectTags';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/pro-light-svg-icons';

const shortid = require('shortid');

///////////////////////////////////////////////////////////////////////


class NewBookForm extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentlyEditing: true,
               book: this.props.book,
               currentlyEditingGenre: false,
               currentlyEditingTags: false,
               genre: this.props.book.genre,
               tags: this.props.book.tags,
               dateRemoved: false,
               showDatePicker: true,
               viewDescription: false,
          }
     }


     book = this.props.book;
     id = this.book.id;
     bookshelfRating = this.book.bookshelfRating;
     bookshelfTimestamp = this.book.bookshelfTimestamp;
     bookshelfGenre = this.book.genre;
     bookshelfTags = this.book.tags;


     editThisBook = (event) => {
          // 1. Stop the form from submitting
          event.preventDefault();
          const book = this.props.book;
          console.log("editThisBook -----------------------------------");
          console.log(book);
          console.log("Rating: " + this.bookshelfRating);
          console.log("Timestamp: " + this.bookshelfTimestamp);
          console.log("Genre: " + this.bookshelfGenre);
          console.log("Tags: " + this.bookshelfTags);

          book.bookshelfRating = this.bookshelfRating;
          book.bookshelfTimestamp = this.bookshelfTimestamp;
          if( this.bookshelfRating !== undefined) { book.bookshelfRating = this.bookshelfRating; } else { book.bookshelfRating = 0; }
          if( this.bookshelfTimestamp !== undefined) { book.bookshelfTimestamp = this.bookshelfTimestamp; } else { book.bookshelfTimestamp = 0; }
          if( this.bookshelfGenre !== undefined) { book.genre = this.bookshelfGenre; } else { book.genre = ''; }
          if( this.bookshelfTags !== undefined) { book.tags = this.bookshelfTags; } else { book.tags = ''; }

          this.props.newImprovedEditBook(book);

     }

     setRating = (selectedOption) => {
          if(selectedOption) {
               this.bookshelfRating = selectedOption.value;
               this.setState({ bookshelfRating: selectedOption.value });
          }
          else {
               this.setState({ bookshelfRating: '' });
          }

     }

     setGenre = (selectedOption) => {
          if(selectedOption) {
               this.bookshelfGenre = selectedOption.value;
               this.setState({ genre: selectedOption.value });
          }
          else {
               this.bookshelfGenre = undefined;
               this.setState({ genre: '' });
          }

     }


     getCompletedDate = (date) => {
          //this.bookshelfTimestamp = date;
          console.log("Completed DATE: " + this.bookshelfTimestamp);
          let updatedTimestamp = parseInt((new Date(date).getTime()).toFixed(0));
          console.log(updatedTimestamp);
          this.bookshelfTimestamp = updatedTimestamp;
     }

     removeDate = () => {
          console.log("removeDate");
          this.bookshelfTimestamp = 0;
          this.setState({ dateRemoved: true, showDatePicker: false });
     }

     showDate = () => {
          this.bookshelfTimestamp = parseInt((new Date().getTime()).toFixed(0));
          this.setState({ dateRemoved: false, showDatePicker: true });
     }

     currentlyEditingTags = () => {
          console.log("currentlyEditingTags");
          console.log("POSSIBLE TAGS");
          console.log(this.props.tags);
          this.setState({ currentlyEditingTags: true });
     }

     currentlyEditingGenre = () => {
          console.log("currentlyEditingGenre");
          this.setState({ currentlyEditingGenre: true });
     }

     customToggle = () => {
          this.setState(prevState => ({
            viewDescription: !prevState.viewDescription
          }));
     }


render() {

     console.log("Current book: " + JSON.stringify(this.props.book));
     console.log(this.props.genres);
     const defaultRating = this.bookshelfRating;
     const bookshelfTimestamp = this.bookshelfTimestamp;
     let description = this.props.book.description;

     ////////////// Genre //////////////////////////////////////////

     let genreArea = <div className="genre-area">
          Genre: {this.state.genre} <span className="edit-icon" onClick={this.currentlyEditingGenre} title="Edit Genre"><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon remove" onClick={this.resetGenre} title="Remove Genre"><FontAwesomeIcon icon={faMinusCircle} /></span>
     </div>;

     if( this.state.genre === null || this.state.genre === undefined || this.state.genre === '' ) {
         genreArea = <div className="genre-area">
                             <span className="edit-book-subtle-link" onClick={this.currentlyEditingGenre}>Set Genre</span> <span className="edit-icon" onClick={this.currentlyEditingGenre}><FontAwesomeIcon icon={faEdit} /></span>
                        </div>;
   }

   if( this.state.currentlyEditingGenre === true) {
         genreArea = <div className="genre-area">
                             <SelectGenre
                                  genres={this.props.genres}
                                  setGenre={this.setGenre}
                                  defaultGenre={this.state.genre}
                             />
                        </div>;
   }


   ////////////// Tags //////////////////////////////////////////

   let currentTags = null;
   if( this.state.tags !== undefined && this.state.tags !== '' ) {
        currentTags = this.state.tags.map((tag) =>
          <span className="single-tag" key={shortid.generate()}>{tag}</span>
        );
   }

   let tagArea = <div className="tag-area">
        Tags: {currentTags} <span className="edit-icon" onClick={this.currentlyEditingTags} title="Edit Tags"><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon remove" onClick={this.resetTags} title="Remove All Tags"><FontAwesomeIcon icon={faMinusCircle} /></span>
   </div>;

   if( this.state.tags === null || this.state.tags === undefined || this.state.tags === '' || this.state.tags === [] ) {
       tagArea = <div className="tag-area">
                           <span className="edit-book-subtle-link" onClick={this.currentlyEditingTags}>Add Tags</span> <span className="edit-icon" title="Add Tags Now" onClick={this.currentlyEditingTags}><FontAwesomeIcon icon={faEdit} /></span>
                      </div>;
  }

  if( this.state.currentlyEditingTags === true) {
       tagArea = <div className="tag-area">
                           <SelectTags
                                allTags={this.props.tags}
                                setTags={this.setTags}
                                defaultTags={this.state.tags}
                                setBookTags={this.props.setBookTags}
                                book={this.props.book}
                                addNewTag={this.props.addNewTag}
                           />
                      </div>;
  }


    /////////////////////////////////////////


    console.log(this.props.book);

    if( this.props.searchResult ) {
         console.log("searchResult");
         description = this.props.book.volumeInfo.description;
         console.log(description);
    }

       return (
            <>

            <form className="edit-book clb-updated" onSubmit={this.editThisBook} >
               <div className="book-rating-area">
                    <SelectRating
                         setRating={this.setRating}
                         defaultRating={defaultRating}
                    />
               </div>
               <div className="book-date-area">
                    { this.state.showDatePicker === true &&
                         <>
                              <ReadDate
                                   bookshelfTimestamp={bookshelfTimestamp}
                                   getCompletedDate={this.getCompletedDate}
                              />
                              <span className="edit-icon remove" onClick={this.removeDate} title="Remove Date"><FontAwesomeIcon icon={faMinusCircle} /></span>
                         </>
                    }
                    { this.state.showDatePicker === false &&
                              <><span className="edit-book-subtle-link" onClick={this.showDate}>Set Date</span> <span className="edit-icon" onClick={this.showDate}> <FontAwesomeIcon icon={faEdit} /></span></>
                    }
               </div>
               {this.props.useGenres &&
                    <div className="modal-info-line modal-summary-genre-area">
                         {genreArea}
                    </div>
               }

               {this.props.useTags &&
                    <div className="modal-info-line modal-summary-tag-area">
                         {tagArea}
                    </div>
               }
               <button type="submit" className="update-this-book">Save Book Info & Add to Your Already Read Shelf</button>
            </form>
            <Accordion>
                 <Accordion.Toggle onClick={this.customToggle} as={Button} variant="link" eventKey="0" className="already-read-description-toggle">
                  { this.state.viewDescription === true &&
                       <h3>View Description –</h3>
                  }
                  { this.state.viewDescription === false &&
                       <h3>View Description +</h3>
                  }
                 </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                 <div className="book-description" dangerouslySetInnerHTML={ { __html: description } }></div>
              </Accordion.Collapse>
          </Accordion>
         </>
       );
     }

}


export default NewBookForm;
