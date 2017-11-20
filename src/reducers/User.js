const DummyUser = {
  id: null,
  firstName: null,
  lastName: null,
  token: null,
  email: null
};

function User(state = DummyUser, action) {
  switch (action.type) {
  case 'FETCH_USER':
    const newObj = Object.assign({}, state);

    newObj.id = action.id;
    newObj.firstName = action.firstName;
    newObj.lastName = action.lastName;
    newObj.token = action.token;
    newObj.email = action.email;

    return newObj;
  case 'DROP_USER':
    self.sessionStorage.clear();
    return {};
  default:
    return state;
  }
}

export { User, DummyUser };
