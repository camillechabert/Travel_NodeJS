export default function user(state = dummyUser, action) {
    switch(action.type) {
        case 'FETCH_USER':
            const newObj = Object.assign(new Object(), state);
            
            newObj.id = action.id;
            newObj.firstName = action.name;
            newObj.lastName = action.last;
            newObj.token = action.token;
            newObj.email = action.email;

            return newObj;
        default:
            return state;
    }
}

const dummyUser = {
    id: null,
    firstName: null,
    lastName: null,
    token: null,
    email: null
}