import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header.js';
import Router from './components/Router.js';

import base from './base';
import { firebaseApp } from './base';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
