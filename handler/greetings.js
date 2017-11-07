'use strict';

var logger = require('../utils/logger');
var {Response} = require('../model/response');
var {ErrorResponse} = require('../model/errorresponse');
var {Greeting} = require('../model/greeting');

logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);

var create = (event, context, callback) => {
  logger.info(`> create - event: ${JSON.stringify(event)}`);

  let body = JSON.parse(event.body);
  let value = body.value;
  let author = body.author;
  let greeting = new Greeting({value, author});

  greeting.save().then((data) => {
    logger.debug(`Greeting saved successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(greeting.toObject()).toJSON());
  }).catch((err) => {
    logger.error(`Greeting save resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var findAll = (event, context, callback) => {
  logger.info(`> findAll - event: ${JSON.stringify(event)}`);

  Greeting.findAll().then((data) => {
    logger.debug(`Greetings fetched successfully. data: ${JSON.stringify(data)}`);
    let greetings = data.Items;
    callback(null, new Response({greetings}).toJSON());
  }).catch((err) => {
    logger.error(`Greetings findAll resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var findById = (event, context, callback) => {
  logger.info(`> findById - event: ${JSON.stringify(event)}`);

  let greetingId = event.pathParameters.greetingId;

  Greeting.findOne(greetingId).then((data) => {
    if (data && data.Item) {
      // Found
      logger.debug(`Greeting fetched successfully. data: ${JSON.stringify(data)}`);
      callback(null, new Response(data.Item).toJSON());
    } else {
      // Not Found
      callback(null, new Response(undefined, 404).toJSON());
    }
  }).catch((err) => {
    logger.error(`Greetings findOne resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var update = (event, context, callback) => {
  logger.info(`> update - event: ${JSON.stringify(event)}`);

  let greetingId = event.pathParameters.greetingId;
  let body = JSON.parse(event.body);
  body.id = greetingId;

  Greeting.findOneAndUpdate(body).then((data) => {
    logger.debug(`Greeting updated successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(data.Attributes).toJSON());
  }).catch((err) => {
    if (err.name === 'ConditionalCheckFailedException') {
      callback(null, new Response(undefined, 404).toJSON());
    } else {
      logger.error(`Greeting update resulted in error. error: ${err}`);
      callback(null, new ErrorResponse(err).toJSON());
    }
  });
};

var remove = (event, context, callback) => {
  logger.info(`> remove - event: ${JSON.stringify(event)}`);

  let greetingId = event.pathParameters.greetingId;

  Greeting.remove(greetingId).then((data) => {
    if (data && data.Attributes) {
      // Found
      logger.debug(`Greeting deleted successfully. data: ${JSON.stringify(data)}`);
      callback(null, new Response(data.Attributes).toJSON());
    } else {
      // Not Found
      callback(null, new Response(undefined, 404).toJSON());
    }
  }).catch((err) => {
    logger.error(`Greeting delete resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
