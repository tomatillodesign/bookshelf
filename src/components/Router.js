import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing.js';
import Search from './Search.js';
import Settings from './Settings.js';
import NotFound from './NotFound.js';
import SavedForLater from './SavedForLater.js';
import PreviouslyRead from './PreviouslyRead.js';
import Results from './Results.js';

class Router extends React.Component {

     constructor(props) {
          super(props);

     this.state = {
       };

     }

     render() {

          return(

     <BrowserRouter>
          <Switch>
               <Route exact path="/" component={Landing} />
               <Route exact path="/search" component={Search} />
               <Route exact path="/results"
                    render={(props) => <Results {...props} test={true}
                                                  addBookAlreadyRead={this.props.addBookAlreadyRead}
                                                  addBookToRead={this.props.addBookToRead}
                                             />}
               />

               <Route exact path="/saved"
                    component={() =>
                         <SavedForLater
                              booksToRead={this.props.booksToRead}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                              editBook={this.props.editBookToRead}
                              moveBooktoAlreadyRead={this.props.moveBooktoAlreadyRead}
                              removeBookFromToRead={this.props.removeBookFromToRead}
                              addNewImagesToRead={this.props.addNewImagesToRead}
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
                         />}
               />
               <Route exact path="/settings"
                    component={() =>
                         <Settings
                              logOutUser={this.props.logOutUser}
                         />}
               />
               <Route component={NotFound} />
          </Switch>
     </BrowserRouter>);

     }

}

export default Router;
