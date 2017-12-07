import { FETCH_USER, DROP_USER_ASYNC, CREATE_USER } from '../actions/userActions';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { dropUserAsync, userXhr, createUserAsync } from './userMiddleware';

/** *******************************
 *  SAGAS TAKERS
 */

export function *sagas() {
  yield takeLatest(FETCH_USER, userXhr);
  yield takeLatest(CREATE_USER, createUserAsync);
  yield takeEvery(DROP_USER_ASYNC, dropUserAsync);
}
