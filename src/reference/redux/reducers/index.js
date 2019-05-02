import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
  signInState: signInReducer,
  usersState: usersReducer
});
