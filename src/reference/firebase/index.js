import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0VjTvtIh3aDJUvfT5eiy1zoS-0cMooNg",
  authDomain: "homebase-3336e.firebaseapp.com",
  databaseURL: "https://homebase-3336e.firebaseio.com",
  projectId: "homebase-3336e",
  storageBucket: "homebase-3336e.appspot.com",
  messagingSenderId: "290467817126"
};
firebase.initializeApp(config);

export const updateToFirebase = (reference, object) => {
  firebase.database().ref(reference).set(object)
}

export const pushToFirebase = (reference, object) => {
  const ref = firebase.database().ref(reference);
  ref.push().set(object);
};

export const deleteFromFirebase = reference => {
  let item = firebase.database().ref(reference);
  item.remove().then(()=>{
    console.log("Remove succeeded");
  })
  .catch(err => {
    console.log("Remove failed: " + err.message);
  })
}

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
