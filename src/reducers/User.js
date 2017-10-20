export default function user(state = dummyUser, action) {
    switch(action.type) {
        case 'FETCH_USER':
            const newObj = Object.assign(new Object(), state);

            newObj.firstName = action.name;
            newObj.lastName = action.last;
            newObj.apiToken = action.apiToken;

            return newObj;
        default:
            return state;
    }
}

const dummyUser = {
    firstName: null,
    lasName: null,
    password: null,
    apiToken: null,
    email: null
}