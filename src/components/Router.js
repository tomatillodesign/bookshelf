import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing.js';
import Search from './Search.js';
import Settings from './Settings.js';
import NotFound from './NotFound.js';
import SavedForLater from './SavedForLater.js';
import PreviouslyRead from './PreviouslyRead.js';
import Results from './Results.js';

const Router = () => (

     <BrowserRouter>
          <Switch>
               <Route exact path="/" component={Landing} />
               <Route exact path="/search" component={Search} />
               <Route exact path="/results" component={Results} />
               <Route exact path="/saved" component={SavedForLater} />
               <Route exact path="/read" component={PreviouslyRead} />
               <Route exact path="/settings" component={Settings} />
               <Route component={NotFound} />
          </Switch>
     </BrowserRouter>

);

export default Router;
