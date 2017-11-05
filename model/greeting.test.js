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

  describe('#findOne', () => {

    // Mock db
    var db = {
      get: sinon.spy()
    };
    var tableName = 'Greetings';
    // Inject Mock db into greeting module
    var greetingModule = rewire('./greeting');
    greetingModule.__set__({
      db,
      tableName
    });

    it('should call get', () => {
      greetingModule.Greeting.findOne(id);

      expect(db.get.calledOnce).toBeTruthy();
    });

    it('should call get with param values', () => {
      greetingModule.Greeting.findOne(id);

      expect(typeof db.get.args[0]).toBe('object');

      var getParams = db.get.args[0][0];
      expect(getParams.TableName).toBe(tableName);
      expect(getParams.Key.id).toBe(id);
    });

  });

  describe('#findOneAndUpdate', () => {

    // Mock db
    var db = {
      update: sinon.spy()
    };
    var tableName = 'Greetings';
    // Inject Mock db into greeting module
    var greetingModule = rewire('./greeting');
    greetingModule.__set__({
      db,
      tableName
    });

    it('should call update', () => {
      greetingModule.Greeting.findOneAndUpdate({
        id,
        value,
        author
      });

      expect(db.update.calledOnce).toBeTruthy();
    });

    it('should call update with param values', () => {
      greetingModule.Greeting.findOneAndUpdate({
        id,
        value,
        author
      });

      expect(typeof db.update.args[0]).toBe('object');

      var updateParams = db.update.args[0][0];
      expect(updateParams.TableName).toBe(tableName);
      expect(updateParams.Key.id).toBe(id);
      expect(updateParams).toMatchObject({
        ExpressionAttributeValues: {
          ':t': value,
          ':a': author
        }
      });
    });

  });

  describe('#remove', () => {

    // Mock db
    var db = {
      remove: sinon.spy()
    };
    var tableName = 'Greetings';
    // Inject Mock db into greeting module
    var greetingModule = rewire('./greeting');
    greetingModule.__set__({
      db,
      tableName
    });

    it('should call remove', () => {
      greetingModule.Greeting.remove(id);

      expect(db.remove.calledOnce).toBeTruthy();
    });

    it('should call remove with param values', () => {
      greetingModule.Greeting.remove(id);

      expect(typeof db.remove.args[0]).toBe('object');

      var removeParams = db.remove.args[0][0];
      expect(removeParams.TableName).toBe(tableName);
      expect(removeParams.ReturnValues).toBe('ALL_OLD');
      expect(removeParams.Key.id).toBe(id);
    });

  });

});
