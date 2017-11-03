'use strict';

const AWS = require('aws-sdk');

var db = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-10-08'
});

var put = (params) => {
  return db.put(params).promise();
};

var scan = (params) => {
  return db.scan(params).promise();
};

var get = (params) => {
  return db.get(params).promise();
};

var update = (params) => {
  return db.update(params).promise();
};

var remove = (params) => {
  return db.delete(params).promise();
};

module.exports = {
  put,
  scan,
  get,
  update,
  remove
};
