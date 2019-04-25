import { FETCH_USER_INFO, GET_CURRENT_USER_INFO } from "../actions/types";

const initialState = {
  users: [],
  curUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {
        ...state,
        users: action.payload
      };
    case GET_CURRENT_USER_INFO:
      return {
        ...state,
        curUser: action.payload
      };
    default:
      return state;
  }
}
