'use strict';

const expect = require('expect');

const {Response} = require('./response');

describe('Response', () => {

  describe('constructor', () => {

    it('should set the body attribute', () => {
      var body = {
        a: 'value'
      };
      var response = new Response(body);

      expect(response).not.toBeNull();
      expect(typeof response).toBe('object');
      expect(response.body).toEqual(body);
    });

    it('should set the default statusCode attribute', () => {
      var response = new Response(undefined);

      expect(response.statusCode).toEqual(200);
    });

    it('should set the statusCode attribute', () => {
      var response = new Response(undefined, 400);

      expect(response.statusCode).toEqual(400);
    });

  });

  describe('#toJSON', () => {

    var body = {
      a: 'val',
      b: 9
    };

    it('should contain status 200', () => {
      var json = new Response(body).toJSON();

      expect(json).toMatchObject({statusCode: 200});
    });

    it('should contain status 400', () => {
      var json = new Response(body, 400).toJSON();

      expect(json).toMatchObject({statusCode: 400});
    });

    it('should contain body string', () => {
      var json = new Response(body).toJSON();
      var bodyStr = JSON.stringify(body);

      expect(json.body).toBe(bodyStr);
    });

    it('should match format', () => {
      var responseObj = {
        statusCode: 200,
        body: JSON.stringify(body)
      };
      var json = new Response(body).toJSON();

      expect(json).toMatchObject(responseObj);
      expect(typeof json.statusCode).toBe('number');
      expect(typeof json.body).toBe('string');
    });

  });

});
