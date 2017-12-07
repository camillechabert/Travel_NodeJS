export const ADD_DEST_COORDINATES = 'ADD_DEST_COORDINATES';

export const addDestCoordinates = (coords) => {
  return {
    type: ADD_DEST_COORDINATES,
    payload: coords
  };
};
