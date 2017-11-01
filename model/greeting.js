'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

var db = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-10-08'
});
var tableName = process.env.TABLE_NAME;
console.log('tableName:', tableName);

class Greeting {
  constructor(text, author) {
    console.log('construct Greeting');
    console.log(` text: ${text}`);
    console.log(` author: ${author}`);
    this.text = text;
    this.author = author;
  }

  save () {
    console.log('save');
    this.id = uuid();
    var params = {
      Item: {
        id: this.id,
        text: this.text,
        author: this.author
      },
      TableName: tableName
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.put(params).promise();
  }

  toObject () {
    return {
      id: this.id,
      text: this.text,
      author: this.author
    }
  }

  static findAll () {
    console.log('findAll');
    var params = {
      TableName: tableName
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.scan(params).promise();
  }

  static findById (id) {
    console.log(`> Greeting.findById - id: ${id}`);
    var params = {
      TableName: tableName,
      Key: {
        id
      }
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.get(params).promise();
  }};

module.exports = {
  Greeting
};
