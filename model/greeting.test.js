'use strict';

const expect = require('expect');

const {Greeting} = require('./greeting');

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

});
