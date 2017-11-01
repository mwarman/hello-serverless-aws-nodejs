'use strict';

var {Response} = require('./model/response');
var {Greeting} = require('./model/greeting');

var create = (event, context, callback) => {
  console.log('body:', event.body);

  let body = JSON.parse(event.body);
  let greeting = new Greeting(body.text, body.author);

  greeting.save().then((data) => {
    console.log(`Greeting saved successfully. data: ${JSON.stringify(data)}`);
    callback(null, new Response(greeting.toObject()).toJSON());
  }).catch((err) => {
    console.log(`Greeting save resulted in error. error: ${err}`);
    callback(null, new Response(null, 400).toJSON());
  });
};

var findAll = (event, context, callback) => {
  console.log('body:', event.body);

  Greeting.findAll().then((data) => {
    console.log(`Greetings fetched successfully. data: ${JSON.stringify(data)}`);
    let response = {};
    response.greetings = data.Items;
    callback(null, new Response(response).toJSON());
  }).catch((err) => {
    console.log(`Greetings findAll resulted in error. error: ${err}`);
    callback(null, new Response(null, 400).toJSON());
  });
};

module.exports = {
  create,
  findAll
};
