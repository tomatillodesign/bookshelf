import React from 'react';
import RecentlyAddedToRead from './RecentlyAddedToRead';
import RecentlyAddedAlreadyRead from './RecentlyAddedAlreadyRead';


/// This page is once you've already logged in

function Landing(props) {

  return (
    <div className="landing-page-area single-page">
      { props.notification &&
           <div className="notification-area">{props.notification}</div>
      }
      <RecentlyAddedToRead
          booksToRead={props.booksToRead}
          editBook={props.editBook}
          moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
          removeBookFromToRead={props.removeBookFromToRead}
          addNewImagesToRead={props.addNewImagesToRead}
          settingsFont={props.settingsFont}
          settingsColor={props.settingsColor}
          updateCoverImg={props.updateCoverImg}
          useGenres={props.useGenres}
          useTags={props.useTags}
          genres={props.genres}
          tags={props.tags}
          newImprovedEditBook={props.newImprovedEditBook}
      />
      <RecentlyAddedAlreadyRead
          booksAlreadyRead={props.booksAlreadyRead}
          editBook={props.editBook}
          removeBookFromAlreadyRead={props.removeBookFromAlreadyRead}
          addNewImagesAlreadyRead={props.addNewImagesAlreadyRead}
          settingsFont={props.settingsFont}
          settingsColor={props.settingsColor}
          updateCoverImg={props.updateCoverImg}
          setBookRating={props.setBookRating}
          resetRatingToZero={props.resetRatingToZero}
          resetTimestampToZero={props.resetTimestampToZero}
          setBookTimestamp={props.setBookTimestamp}
      />
    </div>
  );
}

export default Landing;
