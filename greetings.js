'use strict';

var {Response} = require('./model/response');
var {Greeting} = require('./model/greeting');

var create = (event, context, callback) => {
  console.log('body:', event.body);

  let greeting = new Greeting(event.body.text, event.body.author);

  greeting.save();

  let resp = new Response(greeting);

  callback(null, resp.toJSON());
};

module.exports = {
  create
};
