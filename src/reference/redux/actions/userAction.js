import {
  LOG_IN,
  LOG_OUT,
  FETCH_USER_INFO,
  GET_CURRENT_USER_INFO
} from "../actions/types";
import firebase, { pullFromFirebase } from "../../firebase";

export function fetchUsersInfo() {
  return function(dispatch) {
    var users = [];
    pullFromFirebase("users", snapshot => {
      snapshot.forEach(item => {
        users.push({
          id: item.key,
          ...item.val()
        });
      });
      dispatch({
        type: FETCH_USER_INFO,
        payload: users
      });
    });
  };
}

export function fetchCurrentUserInfo() {
  return function(dispatch) {
    var curUser = {
      ratings: 0,
      listings: 0,
      rents: 0
    };
    var hasUser = false;
    pullFromFirebase("users", snapshot => {
      snapshot.forEach(item => {
        if (firebase.auth().currentUser.uid == item.key) {
          curUser = item.val();
          hasUser = true;
        }
      });
      dispatch({
        type: GET_CURRENT_USER_INFO,
        payload: curUser
      });
    });
    if (!hasUser) {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .set(curUser);
    }
  };
}
export function logIn() {
  return function(dispatch) {
    dispatch({
      type: LOG_IN,
      payload: true
    });
  };
}

export function logOut() {
  return function(dispatch) {
    dispatch({
      type: LOG_OUT,
      payload: false
    });
  };
}
