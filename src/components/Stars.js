import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Stars(props) {


     const rating = parseInt(props.bookshelfRating);
     console.log(props.bookshelfRating);

     let stars = null;
     if(rating === 5) {
          stars = <><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span></>;
     }
     else if(rating === 4) {
          stars = <><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span></>;
     }
     else if(rating === 3) {
          stars = <><span className="star-icon">⭐</span><span className="star-icon">⭐</span><span className="star-icon">⭐</span></>;
     }
     else if(rating === 2) {
          stars = <><span className="star-icon">⭐</span><span className="star-icon">⭐</span></>;
     }
     else if(rating === 1) {
          stars = <><span className="star-icon">⭐</span></>;
     }
     else {
          stars = null;
     }

  return (
    <div className="star-rating-area">
          {stars}
    </div>
  );
}

export default Stars;
