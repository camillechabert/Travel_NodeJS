import { ADD_DEST, DELETE_DESTS } from '../actions/destinationActions';

function Destinations(state = [], action) {
  switch (action.type) {
  case DELETE_DESTS:
    // Simply let the garbage collector do its job
    return [];
  case ADD_DEST:
    let locked = false;

    // Return a copy while updating the current array if necessary
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
