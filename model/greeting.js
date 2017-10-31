'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

var db = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-10-08'
});
var tableName = Process.env.TABLE_NAME;
console.log('tableName:', tableName);

class Greeting {
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }

  save () {
    var params = {
      Item: {
        id: uuid(),
        text: this.text,
        author: this.author
      },
      TableName: tableName
    };

    db.put(params, (err, data) => {
      // Promise?
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(data);
      }
    });

  }
};

module.exports = {
  Greeting
};
