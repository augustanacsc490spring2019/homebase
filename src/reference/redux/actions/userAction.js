import { LOG_IN, LOG_OUT } from "../actions/types";

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
