'use strict';

var {Response} = require('./model/response');
var {ErrorResponse} = require('./model/errorresponse');
var {Greeting} = require('./model/greeting');

var create = (event, context, callback) => {
  console.log(`> create - event: ${JSON.stringify(event, null, 2)}`);

  let body = JSON.parse(event.body);
  let greeting = new Greeting(body.value, body.author);

  greeting.save().then((data) => {
    console.log(`Greeting saved successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(greeting.toObject()).toJSON());
  }).catch((err) => {
    console.log(`Greeting save resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var findAll = (event, context, callback) => {
  console.log(`> findAll - event: ${JSON.stringify(event, null, 2)}`);

  Greeting.findAll().then((data) => {
    console.log(`Greetings fetched successfully. data: ${JSON.stringify(data)}`);
    let greetings = data.Items;
    callback(null, new Response({greetings}).toJSON());
  }).catch((err) => {
    console.log(`Greetings findAll resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var findById = (event, context, callback) => {
  console.log(`> findById - event: ${JSON.stringify(event, null, 2)}`);

  let greetingId = event.pathParameters.greetingId;

  Greeting.findOne(greetingId).then((data) => {
    console.log(`Greeting fetched successfully. data: ${JSON.stringify(data)}`);
    if (data && data.Item) {
      // Found
      callback(null, new Response(data.Item).toJSON());
    } else {
      // Not Found
      callback(null, new Response(undefined, 404).toJSON());
    }
  }).catch((err) => {
    console.log(`Greetings findOne resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var update = (event, context, callback) => {
  console.log(`> update - event: ${JSON.stringify(event, null, 2)}`);

  let greetingId = event.pathParameters.greetingId;
  let body = JSON.parse(event.body);
  body.id = greetingId;

  Greeting.findOneAndUpdate(body).then((data) => {
    console.log(`Greeting updated successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(data.Attributes).toJSON());
  }).catch((err) => {
    console.log(`Greeting update resulted in error. error: ${err}`);
    callback(null, new ErrorResponse(err).toJSON());
  });
};

var remove = (event, context, callback) => {
  console.log(`> remove - event: ${JSON.stringify(event, null, 2)}`);

  let greetingId = event.pathParameters.greetingId;

  Greeting.remove(greetingId).then((data) => {
    console.log(`Greeting deleted successfully. data: ${JSON.stringify(data)}`);
    if (data && data.Attributes) {
      // Found
      callback(null, new Response(data.Attributes).toJSON());
    } else {
      // Not Found
      callback(null, new Response(undefined, 404).toJSON());
    }
  }).catch((err) => {
    console.log(`Greeting delete resulted in error. error: ${err}`);
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
