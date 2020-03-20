import React from 'react';
import Select from 'react-select';
import SelectRating from './SelectRating';
import Notes from './Notes';
import ReadDate from './ReadDate';
import Stars from './Stars';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/pro-light-svg-icons';

///////////////////////////////////////////////////////////////////////


class BookEditor extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentlyEditingRating: false,
               bookshelfRating: this.props.bookshelfRating,
               currentlyEditingDate: false,
               currentlyEditingGenre: false,
               viewDescription: false,
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


     render() {

          const description = this.props.description;
          let ratingArea = <div className="rating-area">
               Rating: <Stars bookshelfRating={this.state.bookshelfRating} /> <span className="edit-icon" onClick={this.currentlyEditingRating}><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon" onClick={this.resetRating}><FontAwesomeIcon icon={faMinusCircle} /></span>
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

          /////////////////////////////

          console.log(this.props.book.bookshelfTimestamp);

          let dateArea = <div className="date-area">
                              Date Completed: {this.props.dateCompleted} <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon" onClick={this.resetTimestamp}><FontAwesomeIcon icon={faMinusCircle} /></span>
                           </div>;

            if( this.props.book.bookshelfTimestamp === 0) {
                dateArea = <div className="date-area">
                                    <span className="edit-book-subtle-link" onClick={this.currentlyEditingRating}>Set Date</span> <span className="edit-icon" onClick={this.currentlyEditingRating}><FontAwesomeIcon icon={faEdit} /></span>
                               </div>;
           }


           /////////////////////////////////////////

          return (

               <>
               <h2>BookEditor Area</h2>
               <div className="modal-summary-rating-area">
                    {ratingArea}
               </div>
               <div className="modal-summary-date-finished-area">
                    {dateArea}
               </div>

               {this.props.useGenres &&
               <div className="modal-summary-genre-area">
                    Genre: {this.props.genre} <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
               </div>
               }

               <Accordion>
                    <Accordion.Toggle onClick={this.customToggle} as={Button} variant="link" eventKey="0" className="already-read-description-toggle">
                     <h3>View Description +</h3>
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
