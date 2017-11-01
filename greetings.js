'use strict';

var {Response} = require('./model/response');
var {Greeting} = require('./model/greeting');

var create = (event, context, callback) => {
  console.log(`> create - event: ${JSON.stringify(event, null, 2)}`);

  let body = JSON.parse(event.body);
  let greeting = new Greeting(body.text, body.author);

  greeting.save().then((data) => {
    console.log(`Greeting saved successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(greeting.toObject()).toJSON());
  }).catch((err) => {
    console.log(`Greeting save resulted in error. error: ${err}`);
    callback(null, new Response(undefined, 400).toJSON());
  });
};

var findAll = (event, context, callback) => {
  console.log(`> findAll - event: ${JSON.stringify(event, null, 2)}`);

  Greeting.findAll().then((data) => {
    console.log(`Greetings fetched successfully. data: ${JSON.stringify(data)}`);
    let response = {};
    response.greetings = data.Items;
    callback(null, new Response(response).toJSON());
  }).catch((err) => {
    console.log(`Greetings findAll resulted in error. error: ${err}`);
    callback(null, new Response(undefined, 400).toJSON());
  });
};

var findById = (event, context, callback) => {
  console.log(`> findById - event: ${JSON.stringify(event, null, 2)}`);

  let greetingId = event.pathParameters.greetingId;

  Greeting.findById(greetingId).then((data) => {
    console.log(`Greeting fetched successfully. data: ${JSON.stringify(data)}`);
    if (data && data.Item) {
      // Found
      callback(null, new Response(data.Item).toJSON());
    } else {
      // Not Found
      callback(null, new Response(undefined, 404).toJSON());
    }
  }).catch((err) => {
    console.log(`Greetings findById resulted in error. error: ${err}`);
    // TODO Simplify ErrorResponse handling.
    let response = {
      message: err.message
    };
    callback(null, new Response(response, 400).toJSON());
  });
};

module.exports = {
  create,
  findAll,
  findById
};
