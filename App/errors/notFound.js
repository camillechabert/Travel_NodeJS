const HttpError = require('./httpError');

module.exports = class NotFoundError extends HttpError {
  constructor(code, message) {
    super();
    this.statusCode = 404;
    this.code = code || 'NOT_FOUND';
    this.message = message || 'Page not found';
  }
}
;
