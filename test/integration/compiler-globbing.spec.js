'use strict';

var exec = require('node:child_process').exec;
var path = require('node:path');

describe('globbing like --compilers', function () {
  it('should find a file of each type', function (done) {
    exec(
      '"' +
        process.execPath +
        '" "' +
        path.join('bin', 'mocha') +
        '" -R json --require coffeescript/register --require test/compiler-fixtures/foo.fixture "test/compiler/*.@(coffee|foo)"',
      {cwd: path.join(__dirname, '..', '..')},
      function (error, stdout) {
        if (error && !stdout) {
          return done(error);
        }
        var results = JSON.parse(stdout);
        expect(results, 'to have property', 'tests');
        var titles = [];
        for (var index = 0; index < results.tests.length; index += 1) {
          expect(results.tests[index], 'to have property', 'fullTitle');
          titles.push(results.tests[index].fullTitle);
        }
        expect(
          titles,
          'to contain',
          'coffeescript should work',
          'custom compiler should work'
        ).and('to have length', 2);
        done();
      }
    );
  });
});
