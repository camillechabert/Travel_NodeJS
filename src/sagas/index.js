import { FETCH_USER, DROP_USER_ASYNC, addUser, dropUser, CREATE_USER } from '../actions/userActions';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import XHR from '../helpers/XHRClient';

function *userXhr(action) {
  const data = {
    body: XHR._formatQuery('POST', action.payload)
  };

  try {
    const response = yield call(XHR.post, 'http://localhost:3080/auth/token', data);

    if (response.error) {
      throw new Error('response not handled', response);
    }

    const user = formatTokenResponse(response);
    addUserToLocalStorage(user);

    yield put(addUser(user));
  } catch (e) {
    console.error('error', e); // call redux state for error management
  }
}

function *createUserAsync(action) {
  const data = {
    body: XHR._formatQuery('POST', action.payload)
  };

  try {
    const response = yield call(XHR.post, process.env.createUserUrl, data);

    const user = formatTokenResponse(response);
    addUserToLocalStorage(user);

    yield put(addUser(user));
  } catch (e) {
    console.error({ error: 'from create User Sagas', e });
  }
}

function *dropUserAsync(action) {
  try {
    self.sessionStorage.clear();
    yield put(dropUser());
  } catch (e) {
    console.error('sagas error: ', e);
  }
}

/** *******************************
 *  SAGAS TAKERS
 */

export function *sagas() {
  yield takeLatest(FETCH_USER, userXhr);
  yield takeLatest(CREATE_USER, createUserAsync);
  yield takeEvery(DROP_USER_ASYNC, dropUserAsync);
}

/** *******************************
 *  SAGAS HELPERS
 */

/**
 * Transform the JWT payload into plain object
 * @param {*The token response JWT format} response
 */
export const formatTokenResponse = (response) => {
  // Splice the JWT token response in 3, then get the payload that contains the user's informations into plain Object.
  const user = JSON.parse(atob(response.response.split('.')[1]));
  user.token = response.response;
  return user;
};

/**
 * Set the user in sessionStorage
 * @param {*User plain object} user
 */
export const addUserToLocalStorage = (user) => {
  for (let key in user) {
    if (user.hasOwnProperty(key)) {
      self.sessionStorage.setItem(key, user[key]);
    }
  }
};
