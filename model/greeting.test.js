'use strict';

const expect = require('expect');
const rewire = require('rewire');
const sinon = require('sinon');

var {Greeting} = rewire('./greeting');

describe('Greeting', () => {

  let id = 'abcd1234';
  let value = 'value';
  let author = 'author';

  describe('constructor', () => {

    it('should populate all attributes', () => {
      let greeting = new Greeting({
        id,
        value,
        author
      });

      expect(greeting.id).toBe(id);
      expect(greeting.value).toBe(value);
      expect(greeting.author).toBe(author);
    });

    it('should create id when not provided', () => {
      let greeting = new Greeting({
        value,
        author
      });

      expect(greeting.value).toBe(value);
      expect(greeting.author).toBe(author);
      expect(greeting.id).not.toBeNull();
      expect(typeof greeting.id).toBe('string');
    });

  });

  describe('#toObject', () => {

    it('should return an object', () => {
      let greeting = new Greeting({
        id,
        value,
        author
      });
      let obj = greeting.toObject();

      expect(obj).not.toBeNull();
      expect(typeof obj).toBe('object');
    });

    it('should contain matching attributes', () => {
      let greetingObj = {
        id,
        value,
        author
      };
      let greeting = new Greeting(greetingObj);
      let obj = greeting.toObject();

      expect(obj).toEqual(greetingObj);
    });

  });

  describe('#save', () => {

    // Mock db
    var db = {
      put: sinon.spy()
    };
    // Inject Mock db into greeting module
    var greetingModule = rewire('./greeting');
    greetingModule.__set__('db', db);

    it('should call put', () => {
      let greeting = new greetingModule.Greeting({
        value,
        author
      });

      greeting.save();

      expect(db.put.calledOnce).toBeTruthy();
    });

    it('should call put with param values', () => {
      let greeting = new greetingModule.Greeting({
        value,
        author
      });

      greeting.save();

      expect(typeof db.put.args[0]).toBe('object');

      var putParams = db.put.args[0][0];
      expect(putParams.Item.id).not.toBeNull();
      expect(typeof putParams.Item.id).toBe('string');
      expect(putParams.Item.value).toBe(value);
      expect(putParams.Item.author).toBe(author);
    });

  });

  describe('#findAll', () => {

    // Mock db
    var db = {
      scan: sinon.spy()
    };
    var tableName = 'Greetings';
    // Inject Mock db into greeting module
    var greetingModule = rewire('./greeting');
    greetingModule.__set__({
      db,
      tableName
    });

    it('should call scan', () => {
      greetingModule.Greeting.findAll();

      expect(db.scan.calledOnce).toBeTruthy();
    });

    it('should call scan with param values', () => {
      greetingModule.Greeting.findAll();

      expect(typeof db.scan.args[0]).toBe('object');

      var scanParams = db.scan.args[0][0];
      expect(scanParams.TableName).toBe(tableName);
    });

  });

});
