import { createStore, applyMiddleware, compose } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
const DEBUG = true;

const initialState = {
  signInState: {
isSignedIn: false
  },
  usersState: {
    users: [],
    curUser: {}
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  DEBUG ? composeWithDevTools(
    applyMiddleware(...middleware),
  ) : compose(applyMiddleware(...middleware))
);
// console.log(store);
export default store;
