import XHR from '../helpers/XHRClient';
import { showDescription, errorDescription, changeGrade } from '../actions/map/descriptionActions';
import { formatTokenResponse } from './helpers';
import { call, put } from 'redux-saga/effects';

function toGrade(note, nb = 5) {
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

function parseToGrade(note, user = null, nb = 5) {
  if(!user || typeof user === 'undefined') {
    return { community: toGrade(note, nb)};
  }

  return { community: toGrade(note, nb), user: toGrade(user, nb)};
}

/**
 * Fetch API to get the marker description
 * @param{*The current action} action
 */
export function *getMarkerDescription(action) {
  try {
    const response = yield call(XHR.get, process.env.api + 'marker/' + action.payload.id + '/description' + XHR._formatQuery('GET', { user_id: action.payload.user_id}));
    const stars = parseToGrade(response.note || 0, response.user_note);


    yield put(showDescription({...response, stars}));
  } catch (e) {
    yield put(errorDescription(e));
  }
}

export function *addGrade(action) {
  try {
    const response = yield call(XHR.post, process.env.api + 'marker/' + action.payload.marker_id + '/note', { body: XHR._formatQuery('POST', action.payload) });

    yield put(changeGrade(toGrade(response.note)));
  } catch (e) {
    // yield put(errorDescription(e));
  }
}
