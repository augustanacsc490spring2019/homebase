import { SET_POS, SET_ADDRESS } from "../actions/types";

export function setPos(lat, lng) {
  return function(dispatch) {
    dispatch({
      type: SET_POS,
      payload: { lat: lat, lng: lng }
    });
  };
}

export function setAddress(address) {
  return function(dispatch) {
    dispatch({
      type: SET_ADDRESS,
      payload: address
    });
  };
}
