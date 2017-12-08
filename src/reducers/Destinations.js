import { ADD_DEST, DELETE_DESTS } from '../actions/destinationActions';

function Destinations(state = [], action) {
  switch (action.type) {
  case DELETE_DESTS:
    // Remove POI by place id, respet mutable
    const newStated = state.filter((dest) => {
      return dest.place_id !== action.payload;
    }).map(e => e);

    return newStated;
  case ADD_DEST:
    // Return a copy while updating the current array if necessary TODO: MUTABLE NOT WORKING, refactor
    let locked = false;

    const newState = state.map(dest => {
      if (+dest.place_id === +action.payload.place_id) {
        locked = true;
        return action.payload;
      }
      return dest;
    });

    // Only add a the payload if it hasn't been updated
    if (!locked) {
      newState.push(action.payload);
    }

    return newState;
  default:
    return state;
  }
}

export { Destinations };
