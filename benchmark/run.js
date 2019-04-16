'use strict';

const fs = require('fs');
const path = require('path');
const { createBenchmark } = require('./common');
const getSourceMapContent = require('../lib/get-sourcemap-content');

const bench = createBenchmark(main, {
  relativePath: [
    'ember.prod.js',
    'ember.prod.bad.js'
  ],
  n: [100]
});

function main({ n, relativePath }) {
  const src = fs.readFileSync(path.resolve(relativePath), 'utf-8');
  const inFileDirname = path.dirname(relativePath);
  const silent = true;
  bench.start();
  for (var i = 0; i < n; i++) {
    getSourceMapContent(src, inFileDirname, relativePath, silent);
  }
  bench.end(n);
}
