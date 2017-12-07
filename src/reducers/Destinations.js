import { ADD_DEST_COORDINATES } from '../actions/destinationActions';

function Destinations(state = {}, action) {
  switch (action.type) {
  case ADD_DEST_COORDINATES:
    let newState = action.payload;
    if (state.length > 0 && state.split(';').length < 2) { // TODO: don't use dumby logic
      newState = newState + (';' + state);
    }
    return newState;
  default:
    return state;
  }
}

export { Destinations };
