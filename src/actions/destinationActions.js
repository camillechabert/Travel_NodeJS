export const ADD_DEST_COORDINATES = 'ADD_DEST_COORDINATES';
export const ADD_DEST = 'ADD_DEST';
export const DELETE_DESTS = 'DELETE_DESTS';

export const addDestCoordinates = (coords) => {
  return {
    type: ADD_DEST_COORDINATES,
    payload: coords
  };
};

export const addDestination = (destination) => {
  return {
    type: ADD_DEST,
    payload: destination
  };
};

export const deleteDestIds = () => {
  return {
    type: DELETE_DESTS,
    payload: null
  };
};
