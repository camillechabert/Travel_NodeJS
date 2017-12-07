import { ADD_DEST, DELETE_DESTS } from '../actions/destinationActions';

function Destinations(state = [], action) {
  switch (action.type) {
  case DELETE_DESTS:
    return [];
  case ADD_DEST:
    let locked = false;
    const newState = state.map(dest => {
      if (+dest.place_id === +action.payload.place_id) {
        locked = true;
        return action.payload;
      }
      return dest;
    });
    if (!locked) {
      newState.push(action.payload);
    }
    return newState;
  default:
    return state;
  }
}

export { Destinations };
