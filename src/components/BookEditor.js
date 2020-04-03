import React from 'react';
import Select from 'react-select';
import SelectRating from './SelectRating';
import Notes from './Notes';
import ReadDate from './ReadDate';
import Stars from './Stars';
import BookDate from './BookDate';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import SelectGenre from './SelectGenre';
import SelectTags from './SelectTags';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import NewDatePicker from './NewDatePicker';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/pro-light-svg-icons';

const shortid = require('shortid');

///////////////////////////////////////////////////////////////////////


class BookEditor extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentlyEditingRating: false,
               bookshelfRating: this.props.bookshelfRating,
               currentlyEditingDate: false,
               currentlyEditingGenre: false,
               currentlyEditingTags: false,
               viewDescription: false,
               genre: this.props.book.genre,
               tags: this.props.book.tags,
          }
     }


     customToggle = () => {
          console.log("Custom Toggle");
     }


     currentlyEditingRating = () => {
          console.log("currentlyEditingRating");
          this.setState({ currentlyEditingRating: true });
     }


     setRating = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setBookRating(selectedOption, this.props.book);
               this.setState({
                    bookshelfRating: selectedOption.value,
                    currentlyEditingRating: false
                });
          }
     }

     resetRating = () => {
          console.log("resetRating");
          this.props.resetRatingToZero(this.props.book);
     }

     resetTimestamp = () => {
          console.log("resetRating");
          this.props.resetTimestampToZero(this.props.book);
     }

     resetGenre = () => {
          console.log("resetGenre");
          this.setState({ genre: '' });
          this.props.resetGenreToZero(this.props.book);
     }

     resetTags = () => {
          console.log("resetTags");
          this.setState({ tags: [] });
          this.props.resetAllTags(this.props.book);
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

     currentlyEditingDate = () => {
          console.log("currentlyEditingDate");
          this.setState({ currentlyEditingDate: true });
     }

     setGenre = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setBookGenre(selectedOption, this.props.book);
               this.props.addNewGenre(selectedOption.value);
               this.setState({
                    genre: selectedOption.value,
                    currentlyEditingGenre: false
                });
          }
     }


     setTags = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
          }
     }


     selectedDate = new Date();


     handleDateChange = (e, date) => {
          console.log(e);
          console.log(date);
          let theDate = new Date(date);
          let newDateTimestamp = theDate.getTime();
          console.log(theDate);
          this.props.setBookTimestamp(newDateTimestamp, this.props.book);
          this.setState({ currentlyEditingDate: false });

     }


     customToggle = () => {
          this.setState(prevState => ({
            viewDescription: !prevState.viewDescription
          }));
     }


     render() {

          const description = this.props.description;

          ///////////// Rating ////////////////////////////////////

          let ratingArea = <div className="rating-area">
               Rating: <Stars bookshelfRating={this.state.bookshelfRating} /> <span className="edit-icon" onClick={this.currentlyEditingRating} title="Edit Rating"><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon remove" onClick={this.resetRating} title="Remove Rating"><FontAwesomeIcon icon={faMinusCircle} /></span>
          </div>;

          if( this.state.currentlyEditingRating === true) {
               ratingArea = <div className="rating-area">
                                   <SelectRating
                                        setRating={this.setRating}
                                        defaultRating={this.state.bookshelfRating}
                                   />
                              </div>;
          }

          if( this.state.currentlyEditingRating === false && this.state.bookshelfRating === 0 ) {
               ratingArea = <div className="rating-area">
                                   <span className="edit-book-subtle-link" onClick={this.currentlyEditingRating}>Set Rating</span> <span className="edit-icon" onClick={this.currentlyEditingRating}><FontAwesomeIcon icon={faEdit} /></span>
                              </div>;
          }

          ////////////// Date //////////////////////////////////////////

          console.log(this.props.book);


          let dateArea = <div className="date-area">
                              Date Completed: {this.props.dateCompleted} <span className="edit-icon" title="Edit Date" onClick={this.currentlyEditingDate}><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon remove" onClick={this.resetTimestamp} title="Remove Date"><FontAwesomeIcon icon={faMinusCircle} /></span>
                           </div>;

            if( this.props.book.bookshelfTimestamp === 0) {
                dateArea = <div className="date-area">
                                    <span className="edit-book-subtle-link" onClick={this.currentlyEditingDate}>Set Date</span> <span className="edit-icon" onClick={this.currentlyEditingDate}><FontAwesomeIcon icon={faEdit} /></span>
                               </div>;
           }

           if( this.state.currentlyEditingDate === true) {
                dateArea = <div id="date-picker-area" className="date-area">
                                   <NewDatePicker
                                        setBookTimestamp={this.props.setBookTimestamp}
                                        book={this.props.book}
                                   />
                              </div>
           }


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
          if( this.state.tags !== undefined ) {
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

          return (

               <>
               <div className="modal-info-line modal-summary-rating-area">
                    {ratingArea}
               </div>
               <div className="modal-info-line modal-summary-date-finished-area">
                    {dateArea}
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


export default BookEditor;
