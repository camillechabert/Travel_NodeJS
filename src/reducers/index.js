import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { User } from './User';

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: User
});
