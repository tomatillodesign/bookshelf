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
                    render={(props) => <Results {...props} test={true} addBookAlreadyRead={this.props.addBookAlreadyRead} />}
               />

               <Route exact path="/saved" component={SavedForLater} />
               <Route exact path="/read"
                    component={() =>
                         <PreviouslyRead
                              booksAlreadyRead={this.props.booksAlreadyRead}
                              loggedInID={this.props.loggedInID}
                              loggedInEmail={this.props.loggedInEmail}
                              removeBook={this.props.removeBook}
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
