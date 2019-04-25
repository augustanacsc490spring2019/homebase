import { LOG_IN, LOG_OUT } from "../actions/types";

const initialState = {
  isSignedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isSignedIn: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        isSignedIn: action.payload
      };
    default:
      return state;
  }
}
