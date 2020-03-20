import React from 'react';
import Select from 'react-select';
import SelectRating from './SelectRating';
import Notes from './Notes';
import ReadDate from './ReadDate';
import Stars from './Stars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/pro-light-svg-icons';

///////////////////////////////////////////////////////////////////////


class BookEditor extends React.Component {

     constructor(props) {
          super(props);
          this.state = {

          }
     }



     render() {

          return (

               <>
               <h2>BookEditor Area</h2>
               <div className="modal-summary-rating-area">
                    Rating: <Stars bookshelfRating={this.props.bookshelfRating} /> <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
               </div>
               <div className="modal-summary-date-finished-area">
                    Date Completed: {this.props.dateCompleted} <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span> <span className="edit-icon"><FontAwesomeIcon icon={faMinusCircle} /></span>
               </div>

               {this.props.useGenres &&
               <div className="modal-summary-genre-area">
                    Genre: {this.props.genre} <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
               </div>
               }
               </>

               );
     }

}


export default BookEditor;
