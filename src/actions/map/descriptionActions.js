export const GET_DESCRIPTION = 'GET_DESCRIPTION';
export const GET_DESCRIPTION_SUCCESS = 'GET_DESCRIPTION_SUCCESS';
export const GET_DESCRIPTION_ERROR = 'GET_DESCRIPTION_ERROR';

export const getDescription = (id) => {
  return {
    type: GET_DESCRIPTION,
    payload: { id }
  };
};

export const showDescription = (marker) => {
  return {
    type: GET_DESCRIPTION_SUCCESS,
    payload: { marker }
  };
};

export const errorDescription = (error) => {
  return {
    type: GET_DESCRIPTION_ERROR,
    payload: { error }
  };
};
