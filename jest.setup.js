import '@testing-library/jest-dom';

// Add TextEncoder/TextDecoder polyfill for tests
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}
