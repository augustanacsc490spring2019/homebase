import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import usersReducer from "./usersReducer";
import addListingReducer from "./addListingReducer";

export const rootReducer = combineReducers({
  signInState: signInReducer,
  usersState: usersReducer,
  formState: addListingReducer
});
