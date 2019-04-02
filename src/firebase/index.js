import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOnDFnIdgsO8GeS7w9iJ2LNkzBhngMvrg",
  authDomain: "homebase-3336e.firebaseapp.com",
  databaseURL: "https://homebase-3336e.firebaseio.com",
  projectId: "homebase-3336e",
  storageBucket: "homebase-3336e.appspot.com",
  messagingSenderId: "290467817126"
};
firebase.initializeApp(config);

export default firebase;
