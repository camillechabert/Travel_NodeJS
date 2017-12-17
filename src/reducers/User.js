import { ADD_USER, DROP_USER } from '../actions/userActions';

const DummyUser = {
  id: null,
  first_name: null,
  last_name: null,
  token: null,
  email: null,
  avatar: null
};

function User(state = DummyUser, action) {
  switch (action.type) {
  case ADD_USER:
    const user = Object.assign({}, state);

    user.id = action.payload.id;
    user.first_name = action.payload.first_name;
    user.last_name = action.payload.last_name;
    user.token = action.payload.token;
    user.email = action.payload.email;
    user.avatar = action.payload.avatar;

    return user;
  case DROP_USER:
    return {};
  default:
    return state;
  }
}

export { User, DummyUser };
