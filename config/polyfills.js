'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}

const humps = require('humps');
const S = require('string');

String.prototype.camelize = humps.camelize;
String.prototype.decamelize = humps.decamelize;
String.prototype.humanize = function() { return S(this).humanize().s; };
String.prototype.capitalize = function() { return S(this).capitalize().s; };
String.prototype.dasherize = function() { return S(this).dasherize().s; };
String.prototype.underscore = function() { return S(this).underscore().s; };
