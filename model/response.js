'use strict';

class Response {

  constructor(body, statusCode = 200) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = {
      'Access-Control-Allow-Origin': '*'
    };
  }

  toJSON (stringifyBody = true) {
    let bodyValue = stringifyBody ? JSON.stringify(this.body) : this.body;

    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: bodyValue
    };
  }

}

module.exports = {
  Response
};
