'use strict';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
var level = process.env.LOG_LEVEL || 'warn';
var levelNbr = levels[level] || levels['warn'];

var error = (msg) => {
  log('error', msg);
};

var warn = (msg) => {
  log('warn', msg);
};

var info = (msg) => {
  log('info', msg);
};

var debug = (msg) => {
  log('debug', msg);
};

var log = (lvl, msg) => {
  if (levelNbr >= levels[lvl]) {
    console.log(msg);
  }
};

module.exports = {
  error,
  warn,
  info,
  debug
};
