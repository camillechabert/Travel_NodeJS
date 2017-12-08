import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { User } from './User';
import { Destinations } from './Destinations';
import { route } from './DestinationRoute';

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: User,
  destination: Destinations,
  routes: route
});
