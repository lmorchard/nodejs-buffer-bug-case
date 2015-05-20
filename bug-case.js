//
// Usage:
//   node bug-case.js
//   USE_CONSOLE_LOG=0 node bug-case.js
//   DATA_DIR=reduced-data node bug-case.js
//
var fs = require('fs');
var path = require('path');

var USE_CONSOLE_LOG = process.env.USE_CONSOLE_LOG == '1';
var USE_BUFFER_COPY = process.env.USE_BUFFER_COPY == '1';
var DATA_DIR = process.env.DATA_DIR || 'debug-data';

// Load up all the test case data into buffers.
var buffers = fs.readdirSync(DATA_DIR).map(function (file) {
  var filepath = path.join(DATA_DIR, file);
  var stats = fs.statSync(filepath);
  var buf = new Buffer(stats.size);
  if (stats.size > 0) {
    var fd = fs.openSync(filepath, 'r');
    fs.readSync(fd, buf, 0, buf.length);
  }
  return buf
});

// Do the thing with all the buffers.
buffers.forEach(function (buf, idx) {
  if (USE_CONSOLE_LOG) { console.log('buffer', idx); }
  if (USE_BUFFER_COPY) { var copy = new Buffer(buf); }
  var sep = buf.toString().indexOf(':');
});
