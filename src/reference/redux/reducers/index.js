import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  signInState: signInReducer,
  usersState: usersReducer
});
