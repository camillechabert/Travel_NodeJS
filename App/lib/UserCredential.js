const User = require('../../database/models/index').User;

class UserCredential {
    /**
     * Return Attributes permissions for the current credential
     */
    permitions() {
        return ["update", "method", "others"];
    }

    constructor(hash) {
        this.unauthorized = null;
        this.userCredential = Object.assign({}, hash);
        this._validateCredential();
    }

    /**
     * _validateCredential() Throw keys that shouldn't be in the user credential
     */
    _validateCredential() {
        let attributes = Object.keys(User.attributes).concat(this.permitions());
        for (let value in this.userCredential) {
            if (attributes.indexOf(value) === -1) {
                this.unauthorized = value;
                break;
            }
        }
        if (this.unauthorized !== null)
            this.userCredential = this.errorFormat('Attribute invalid: [' + this.unauthorized + ']', 400);
    }

    getCredential() {
        return this.userCredential;
    }

    /**
     * errorFormat() Helper to make the error formatted the same way
     * 
     * @param {* String containing the error user-friendly } message 
     * @param {* Status code for HTTP response } code 
     */
    errorFormat(message, code) {
        const hash = {
            error: null,
            statusCode: null
        };

        if (!message || message.length === 0) {
            hash.error = 'Internal error -> Message isn\'t well formatted';
            hash.statusCode = 500;
            return hash;
        }

        if (!this.isNumeric(code)) {
            hash.error = 'Internal error -> Status code is invalid';
            hash.statusCode = 500;
            return hash;
        }

        hash.error = message;
        hash.statusCode = code;

        return hash;
    }

    isNumeric(n) {
        return (typeof n == "number" && !isNaN(n));
    }
}

module.exports = UserCredential;