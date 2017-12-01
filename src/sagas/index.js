import { FETCH_USER, DROP_USER_ASYNC, addUser } from '../actions/userActions';
import { call, put, takeLatest } from 'redux-saga/effects';
import XHR from '../helpers/XHRClient';

function *userXhr(action) {
  const url = 'http://localhost:3080/auth/token';
  const data = {
    body: XHR._formatQuery('POST', action.payload)
  };

  try {
    const response = yield call(XHR.post, url, data);

    if (response.error) {
      throw new Error('response not handled', response);
    }

    const hashedToken = response.response.split('.');
    const payload = JSON.parse(atob(hashedToken[1]));

    const user = payload;
    user.token = response.response;

    for (let key in user) {
      if(user.hasOwnProperty(key)) {
        self.sessionStorage.setItem(key, user[key]);
      }
    }

    yield put(addUser(user));
  } catch (e) {
    console.error('error', e); // call redux state for error management
  }
}

export function *sagas() {
  yield takeLatest(FETCH_USER, userXhr);
}
