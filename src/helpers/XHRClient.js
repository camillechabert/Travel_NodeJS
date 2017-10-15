import API from 'whatwg-fetch';

class Client {
    get(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain, application/json',
                'Content-Type': 'application/json',
            },
        }).then( (response) => {
            return response.json();
        }).then( (json) => {
            return json;
        }).catch( (error) => {
            return { error: error };         
        });
    }
}

module.exports = new Client();
