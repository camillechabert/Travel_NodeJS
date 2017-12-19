export const GET_GRADE = 'GET_GRADE';
export const GET_GRADE_BY_USER = 'GET_GRADE_BY_ID';
export const RECEIVE_GRADE_USER = 'RECEIVE_GRADE_USER';
export const ADD_GRADE = 'ADD_GRADE';
export const GRADE_ERROR = 'ADD_GRADE_ERROR';

export const getGrade = (marker_id) => {
  return {
    type: GET_GRADE,
    payload: {marker_id}
  };
};

export const getGradeByUser = (marker_id, user_id) => {
  return {
    type: GET_GRADE_BY_USER,
    payload: {marker_id, user_id}
  };
};


export const addGrade = (marker_id, user_id, type, note) => {
  return {
    type: ADD_GRADE,
    payload: { marker_id, user_id, type, note }
  };
};

export const errorGrade = (error) => {
  return {
    type: GRADE_ERROR,
    payload: { error }
  };
};
