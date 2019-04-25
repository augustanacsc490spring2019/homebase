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
    var curUser = {};
    pullFromFirebase("users", snapshot => {
      snapshot.forEach(item => {
        if (firebase.auth().currentUser.uid == item.key) {
          curUser = item.val();
        }
      });
      dispatch({
        type: GET_CURRENT_USER_INFO,
        payload: curUser
      });
    });
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
