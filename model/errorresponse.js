'use strict';

const {Response} = require('./response');

class ErrorResponse extends Response {
  constructor(err, statusCode = 400) {
    super({
      error: err.name,
      message: err.message,
      statusCode: statusCode
    }, statusCode);
  }
}

module.exports = {
  ErrorResponse
};
