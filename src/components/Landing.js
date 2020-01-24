import React from 'react';
import RecentlyAddedToRead from './RecentlyAddedToRead';
import RecentlyAddedAlreadyRead from './RecentlyAddedAlreadyRead';


/// This page is once you've already logged in

function Landing(props) {

  return (
    <div className="landing-page-area single-page">

      <RecentlyAddedToRead
          booksToRead={props.booksToRead}
          editBook={props.editBook}
          moveBooktoAlreadyRead={props.moveBooktoAlreadyRead}
          removeBookFromToRead={props.removeBookFromToRead}
          addNewImagesToRead={props.addNewImagesToRead}
      />
      <RecentlyAddedAlreadyRead
          booksAlreadyRead={props.booksAlreadyRead}
          editBook={props.editBook}
          removeBookFromAlreadyRead={props.removeBookFromAlreadyRead}
          addNewImagesAlreadyRead={props.addNewImagesAlreadyRead}
      />
    </div>
  );
}

export default Landing;