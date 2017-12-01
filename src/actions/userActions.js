export const ADD_USER = 'ADD_USER';
export const DROP_USER = 'DROP_USER';

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
