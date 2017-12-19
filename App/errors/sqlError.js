const HttpError = require('./httpError');

module.exports = class sqlError extends HttpError {
  constructor(code, message) {
    super();
    this.statusCode = 502;
    this.code = code || 'sql error';
    this.message = message || 'Something is wrong with the request';
  }
}
;
