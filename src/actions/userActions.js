export const ADD_USER = 'ADD_USER';
export const DROP_USER = 'DROP_USER';

export const FETCH_USER = 'FETCH_USER';
export const DROP_USER_ASYNC = 'DROP_USER_ASYNC';

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user
  };
};

export const dropUser = () => {
  return {
    type: DROP_USER
  };
};

export const fetchUser = (login) => {
  return {
    type: FETCH_USER,
    payload: login
  };
};
