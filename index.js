#!/usr/bin/env node
//* tme -> Test Me

const Runner = require('./runner');
const runner = new Runner();

//* Collect all the files
const run = async () => {
  const results = await runner.collecFiles(process.cwd());
  runner.runTests();
};

run();
