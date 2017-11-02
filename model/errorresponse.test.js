'use strict';

const expect = require('expect');

const {ErrorResponse} = require('./errorresponse');

describe('ErrorResponse', () => {

  describe('constructor', () => {

    var err = new Error('error message');

    it('should construct new', () => {
      var response = new ErrorResponse(err);

      expect(response).not.toBeNull();
      expect(typeof response).toBe('object');
      expect(typeof response.body).toBe('object');
      expect(typeof response.statusCode).toBe('number');
    });

    it('should set the default statusCode attribute', () => {
      var response = new ErrorResponse(err);

      expect(response.statusCode).toEqual(400);
    });

    it('should set the statusCode attribute', () => {
      var response = new ErrorResponse(err, 500);

      expect(response.statusCode).toEqual(500);
    });

  });

  describe('#toJSON', () => {

    var err = new Error('error message');
    var body = {
      error: 'Error',
      message: 'error message',
      statusCode: 400
    };

    it('should contain status 400', () => {
      var json = new ErrorResponse(err).toJSON();

      expect(json).toMatchObject({statusCode: 400});
    });

    it('should contain status 500', () => {
      var json = new ErrorResponse(err, 500).toJSON();

      expect(json).toMatchObject({statusCode: 500});
    });

    it('should contain body', () => {
      var json = new ErrorResponse(err).toJSON();
      var bodyStr = JSON.stringify(body);

      expect(json.body).toBe(bodyStr);
    });

    it('should match format', () => {
      var responseObj = {
        statusCode: 400,
        body: JSON.stringify(body)
      };
      var json = new ErrorResponse(err).toJSON();

      expect(json).toMatchObject(responseObj);
      expect(typeof json.statusCode).toBe('number');
      expect(typeof json.body).toBe('string');
    });

  });

});
