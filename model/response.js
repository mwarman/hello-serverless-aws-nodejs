'use strict';

class Response {

  constructor(body, statusCode = 200) {
    this.statusCode = statusCode;
    this.body = body;
  }

  toJSON (stringifyBody = true) {
    let bodyValue = stringifyBody ? JSON.stringify(this.body) : this.body;

    return {
      statusCode: this.statusCode,
      body: bodyValue
    };
  }

};

module.exports = {
  Response
};
