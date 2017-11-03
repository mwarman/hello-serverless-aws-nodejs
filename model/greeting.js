'use strict';

const uuid = require('uuid/v4');
var db = require('../db/db');

var tableName = process.env.TABLE_NAME;
console.log('tableName:', tableName);

class Greeting {
  constructor(value, author) {
    console.log('new Greeting');
    console.log(` value: ${value}`);
    console.log(` author: ${author}`);
    this.value = value;
    this.author = author;
  }

  save () {
    console.log('greeting.save');
    this.id = uuid();
    var params = {
      TableName: tableName,
      Item: {
        id: this.id,
        value: this.value,
        author: this.author
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.put(params);
  }

  toObject () {
    return {
      id: this.id,
      value: this.value,
      author: this.author
    };
  }

  static findAll () {
    console.log('> Greeting.findAll');
    var params = {
      TableName: tableName
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.scan(params);
  }

  static findOne (id) {
    console.log(`> Greeting.findOne - id: ${id}`);
    var params = {
      TableName: tableName,
      Key: {
        id
      }
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.get(params);
  }

  static findOneAndUpdate (greeting) {
    console.log(`> Greeting.findOneAndUpdate - greeting: ${JSON.stringify(greeting, null, 2)}`);
    var params = {
      TableName: tableName,
      Key: {
        id: greeting.id
      },
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: `set #v = :t, #a = :a`,
      ExpressionAttributeNames: {
        '#v': 'value',
        '#a': 'author'
      },
      ExpressionAttributeValues: {
        ':t': greeting.value,
        ':a': greeting.author
      },
      ReturnValues: 'ALL_NEW'
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.update(params);
  }

  static remove (id) {
    console.log(`> Greeting.remove - id: ${id}`);
    var params = {
      TableName: tableName,
      Key: {
        id
      },
      ReturnValues: 'ALL_OLD'
    };
    console.log(`params: ${JSON.stringify(params)}`);

    return db.remove(params);
  }
}

module.exports = {
  Greeting
};
