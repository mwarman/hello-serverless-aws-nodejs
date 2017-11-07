'use strict';

const expect = require('expect');

const greetings = require('./greetings');

describe('Greetings Handler', () => {

  it('should export handler functions', ()=> {
    expect(typeof greetings.create).toBe('function');
    expect(typeof greetings.findAll).toBe('function');
    expect(typeof greetings.findById).toBe('function');
    expect(typeof greetings.update).toBe('function');
    expect(typeof greetings.remove).toBe('function');
  });

});
