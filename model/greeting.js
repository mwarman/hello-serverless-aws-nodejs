'use strict';

const uuid = require('uuid/v4');
const logger = require('../utils/logger');
var db = require('../db/db');

var tableName = process.env.TABLE_NAME;
logger.debug(`tableName: ${tableName}`);

class Greeting {
  constructor(greetingObj) {
    this.id = greetingObj.id || uuid();
    this.value = greetingObj.value;
    this.author = greetingObj.author;
  }

  save () {
    logger.info('> greeting.save');
    var params = {
      TableName: tableName,
      Item: {
        id: this.id,
        value: this.value,
        author: this.author
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };
    logger.debug(`params: ${JSON.stringify(params)}`);

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
    logger.info('> Greeting.findAll');
    var params = {
      TableName: tableName
    };
    logger.debug(`params: ${JSON.stringify(params)}`);

    return db.scan(params);
  }

  static findOne (id) {
    logger.info(`> Greeting.findOne - id: ${id}`);
    var params = {
      TableName: tableName,
      Key: {
        id
      }
    };
    logger.debug(`params: ${JSON.stringify(params)}`);

    return db.get(params);
  }

  static findOneAndUpdate (greeting) {
    logger.info(`> Greeting.findOneAndUpdate - greeting: ${JSON.stringify(greeting)}`);
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
    logger.debug(`params: ${JSON.stringify(params)}`);

    return db.update(params);
  }

  static remove (id) {
    logger.info(`> Greeting.remove - id: ${id}`);
    var params = {
      TableName: tableName,
      Key: {
        id
      },
      ReturnValues: 'ALL_OLD'
    };
    logger.debug(`params: ${JSON.stringify(params)}`);

    return db.remove(params);
  }
}

module.exports = {
  Greeting
};
