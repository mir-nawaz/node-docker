/* eslint-disable no-var, no-unused-vars, no-underscore-dangle */

require('dotenv').config();
const { matchers } = require('jest-json-schema');

jest.setTimeout(1000 * 60 * 10);

expect.extend(matchers);

// Make a proxy of the global Jest expect function so we can test the global
global._expect = global.expect;
