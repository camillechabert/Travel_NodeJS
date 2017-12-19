import XHR from '../helpers/XHRClient';
import { showDescription, errorDescription, changeGrade } from '../actions/map/descriptionActions';
import { formatTokenResponse } from './helpers';
import { call, put } from 'redux-saga/effects';

function parseToStar(note, nb = 5) {
  let stars = [];
  let value = note;

  for(let i = 0; i < nb; i++) {
    if(value >= 1) {
      stars.push('star');
    } else if (value <= 0) {
      stars.push('empty star');
    } else {
      stars.push('star half full');
    }
    value--;
  }

  return stars;
}
/**
 * Fetch API to get the marker description
 * @param{*The current action} action
 */
export function *getMarkerDescription(action) {
  try {
    const response = yield call(XHR.get, process.env.api + 'marker/' + action.payload.id + '/description');
    const stars = parseToStar(response.note || 0);


    yield put(showDescription({...response, stars}));
  } catch (e) {
    yield put(errorDescription(e));
  }
}

export function *addGrade(action) {
  try {
    const response = yield call(XHR.post, process.env.api + 'marker/' + action.payload.marker_id + '/note', { body: XHR._formatQuery('POST', action.payload) });

    yield put(changeGrade(parseToStar(response.note)));
  } catch (e) {
    // yield put(errorDescription(e));
  }
}
