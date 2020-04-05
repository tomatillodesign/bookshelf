import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyDniUweenII-q4xtU2jywgLN_lVEcLNnlM",
     authDomain: "bookshelf-9d11e.firebaseapp.com",
     databaseURL: "https://bookshelf-9d11e.firebaseio.com",
     projectId: "bookshelf-9d11e",
     storageBucket: "bookshelf-9d11e.appspot.com",
     messagingSenderId: "16890829596",
     appId: "1:16890829596:web:44b99ad2e1677bca39f8d9"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
