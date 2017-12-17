import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store.js';
import { DummyUser } from './reducers/User';
import { store } from './store';
import App from './components/App';
import NotFound from './components/NotFound';
import Index from './components/Index';
import MapIndex from './components/Map/MapIndex';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Edition from './components/Authentication/Edition';
import Dispatcher from './components/ComponentDispatcher';
import { addUser } from './actions/userActions';

/**
 * User connection not required
 */
const LoginPage = Dispatcher(['user'], false);
const SignUpPage = Dispatcher(['user'], false);
const NotFoundPage = Dispatcher(['user'], false);
const IndexPage = Dispatcher(['user'], false);
// const AppPage = Dispatcher(['user'], false);//nerverused

/**
 * User connection is required
 */
const UserEditPage = Dispatcher(['user'], true);
const MapPage = Dispatcher(['user'], true);

const sessionUser = () => {
  let user = {};
  const userStorage = Object.assign({}, self.sessionStorage);

  for (let key in DummyUser) {
    if (!userStorage[key]) {
      return;
    }
    user[key] = userStorage[key];
  }

  store.dispatch(addUser(user));
};

/**
 * Main path using single responsibility pattern
 */
const router = () => {
  sessionUser();

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage(Index)} />

        <Route path="login" component={LoginPage(Login)} />
        <Route path="sign-up" component={SignUpPage(Register)} />
        <Route path="edit" component={UserEditPage(Edition)} />

        <Route path="map" component={MapPage(MapIndex, {raw: true})} />

        <Route path="*" component={NotFoundPage(NotFound)} />
      </Route>
    </Router>
  );
};

export { router };
