import XHR from '../helpers/XHRClient';
import { showDescription, errorDescription } from '../actions/map/descriptionActions';
import { formatTokenResponse } from './helpers';
import { call, put } from 'redux-saga/effects';

/**
 * Fetch API to get the marker description
 * @param{*The current action} action
 */
export function *getMarkerDescription(action) {
  try {
    const response = yield call(XHR.get, process.env.api + 'marker/' + action.payload.id + '/description');

    let stars = [];
    let value = response.note || 3;


    for(let i = 0; i < 5; i++) {
      if(value >= 1) {
        stars.push('star');
      } else if (value <= 0) {
        stars.push('empty star');
      } else {
        stars.push('star half full');
      }
      value--;
    }

    yield put(showDescription({...response, stars}));
  } catch (e) {
    yield put(errorDescription(e));
  }
}
