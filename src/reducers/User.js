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

    user.id = action.id;
    user.firstName = action.firstName;
    user.lastName = action.lastName;
    user.token = action.token;
    user.email = action.email;

    return user;
  case DROP_USER:
    return {};
  default:
    return state;
  }
}

export { User, DummyUser };
