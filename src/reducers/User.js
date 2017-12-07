import { ADD_USER, DROP_USER } from '../actions/userActions';

const DummyUser = {
  id: null,
  firstName: null,
  lastName: null,
  token: null,
  email: null
};

function User(state = DummyUser, action) {
  switch (action.type) {
  case ADD_USER:
    const user = Object.assign({}, state);

    user.id = action.payload.id;
    user.firstName = action.payload.firstName;
    user.lastName = action.payload.lastName;
    user.token = action.payload.token;
    user.email = action.payload.email;

    return user;
  case DROP_USER:
    return {};
  default:
    return state;
  }
}

export { User, DummyUser };
