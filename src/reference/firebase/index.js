import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

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

export const pushToFirebase = (reference, object) => {
  const ref = firebase.database().ref(reference);
  ref.push(object);
};

export const pullFromFirebase = (reference, callback) => {
  const ref = firebase.database().ref(reference);
  ref.on(
    "value",
    snapshot => {
      callback(snapshot);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
};

export default firebase;
