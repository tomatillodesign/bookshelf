import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing.js';
import Search from './Search.js';
import Recommended from './Recommended.js';
import Settings from './Settings.js';
import NotFound from './NotFound.js';
import SavedForLater from './SavedForLater.js';
import PreviouslyRead from './PreviouslyRead.js';
import Results from './Results.js';
import Register from './Register.js';

class Router extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
       };

     }

     render() {

          console.log(this.props);
          console.log(this.props.books);

          return(

               <div className={"clb-grail-body color-" + this.props.settingsColor + " font-" + this.props.settingsFont}>
     <HashRouter basename="/">
          <Switch>
               <Route exact path="/"
                    component={() =>
                         <Landing
                              booksToRead={this.props.booksToRead}
                              booksAlreadyRead={this.props.booksAlreadyRead}
                              editBook={this.props.editBook}
                              moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              removeBookFromToRead={this.props.removeBookFromToRead}
                              removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                              addNewImagesToRead={this.props.addNewImagesToRead}
                              addNewImagesAlreadyRead={this.props.addNewImagesAlreadyRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                              notification={this.props.notification}
                              notificationTimestamp={this.props.notificationTimestamp}
                              updateCoverImg={this.props.updateCoverImg}
                              useGenres={this.props.useGenres}
                              useTags={this.props.useTags}
                              setBookRating={this.props.setBookRating}
                              resetRatingToZero={this.props.resetRatingToZero}
                              resetTimestampToZero={this.props.resetTimestampToZero}
                              setBookTimestamp={this.props.setBookTimestamp}
                         />}
               />
               <Route exact path="/search" component={Search} />
               <Route exact path="/results"
                                        render={(props) => <Results {...props}
                                             addBookAlreadyRead={this.props.addBookAlreadyRead}
                                             addBookToRead={this.props.addBookToRead}
                                             settingsFont={this.props.settingsFont}
                                             settingsColor={this.props.settingsColor}
                                             notification={this.props.notification}
                                             notificationTimestamp={this.props.notificationTimestamp}
                                        />}
               />

               <Route exact path="/recommended"
                                        render={(props) => <Recommended {...props}
                                             books={this.props.books}
                                             addBookAlreadyRead={this.props.addBookAlreadyRead}
                                             addBookToRead={this.props.addBookToRead}
                                             settingsFont={this.props.settingsFont}
                                             settingsColor={this.props.settingsColor}
                                             notification={this.props.notification}
                                             notificationTimestamp={this.props.notificationTimestamp}
                                        />}
               />

               <Route exact path="/saved"
                    component={() =>
                         <SavedForLater
                              booksToRead={this.props.booksToRead}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                              editBook={this.props.editBookToRead}
                              booksToReadView={this.props.booksToReadView}
                              changeToReadView={this.props.changeToReadView}
                              moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              removeBookFromToRead={this.props.removeBookFromToRead}
                              addNewImagesToRead={this.props.addNewImagesToRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                              notification={this.props.notification}
                              updateCoverImg={this.props.updateCoverImg}
                              bookSize={this.props.bookSize}
                              useGenres={this.props.useGenres}
                         />}
               />

               <Route exact path="/read"
                    component={() =>
                         <PreviouslyRead
                              booksAlreadyRead={this.props.booksAlreadyRead}
                              booksAlreadyReadView={this.props.booksAlreadyReadView}
                              changeAlreadyReadView={this.props.changeAlreadyReadView}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                              editBook={this.props.editBook}
                              removeBookFromAlreadyRead={this.props.removeBookFromAlreadyRead}
                              addNewImagesAlreadyRead={this.props.addNewImagesAlreadyRead}
                              settingsFont={this.props.settingsFont}
                              settingsColor={this.props.settingsColor}
                              updateCoverImg={this.props.updateCoverImg}
                              bookSize={this.props.bookSize}
                              useGenres={this.props.useGenres}
                              useTags={this.props.useTags}
                              setBookRating={this.props.setBookRating}
                              resetRatingToZero={this.props.resetRatingToZero}
                              resetTimestampToZero={this.props.resetTimestampToZero}
                              setBookGenre={this.props.setBookGenre}
                              genres={this.props.genres}
                              resetGenreToZero={this.props.resetGenreToZero}
                              addNewGenre={this.props.addNewGenre}
                              addNewTag={this.props.addNewTag}
                              setBookTags={this.props.setBookTags}
                              tags={this.props.tags}
                              resetAllTags={this.props.resetAllTags}
                              setBookTimestamp={this.props.setBookTimestamp}
                         />}
               />
               <Route exact path="/settings"
                    component={() =>
                         <Settings
                              logOutUser={this.props.logOutUser}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                              resetPassword={this.props.resetPassword}
                              permanentlyDeleteUserAndInfo={this.props.permanentlyDeleteUserAndInfo}
                              settingsColor={this.props.settingsColor}
                              changeSettingsColor={this.props.changeSettingsColor}
                              settingsFont={this.props.settingsFont}
                              changeSettingsFont={this.props.changeSettingsFont}
                              changeSettingsBookSize={this.props.changeSettingsBookSize}
                              bookSize={this.props.bookSize}
                              changeSettingsUseGenres={this.props.changeSettingsUseGenres}
                              changeSettingsUseTags={this.props.changeSettingsUseTags}
                              useGenres={this.props.useGenres}
                              useTags={this.props.useTags}
                         />}
               />
               <Route exact path="/register"
                    component={() =>
                         <Register
                              logOutUser={this.props.logOutUser}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                         />}
               />
               <Route component={NotFound} />
          </Switch>
     </HashRouter>
          </div>);

     }

}

export default Router;
