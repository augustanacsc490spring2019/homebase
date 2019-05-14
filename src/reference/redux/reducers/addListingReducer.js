import { SET_POS, SET_ADDRESS } from "../actions/types";

const initialState = {
  address: "",
  position: {
    lat: 0,
    lng: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POS:
      return {
        ...state,
        position: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
}
