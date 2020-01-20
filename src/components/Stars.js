import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Stars(props) {


     const rating = parseInt(props.bookshelfRating);
     console.log(props.bookshelfRating);

     let stars = null;
     if(rating === 5) {
          stars = <><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></>;
     }
     else if(rating === 4) {
          stars = <><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></>;
     }
     else if(rating === 3) {
          stars = <><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></>;
     }
     else if(rating === 2) {
          stars = <><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></>;
     }
     else if(rating === 1) {
          stars = <><FontAwesomeIcon icon={faStar} /></>;
     }
     else {
          stars = <div className="not-yet-rated">Not yet rated</div>;
     }

  return (
    <div className="star-rating-area">
          {stars}
    </div>
  );
}

export default Stars;
