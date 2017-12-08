import XHR from '../helpers/XHRClient';
import { addUser, dropUser } from '../actions/userActions';
import {formatTokenResponse, addUserToLocalStorage} from './helpers';
import { call, put } from 'redux-saga/effects';

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

export { dropUserAsync, userXhr, createUserAsync };
