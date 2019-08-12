# node-scholarcheck
**Deprecated** - Scholarcheck no longer exists. 

Node API wrapper for [ScholarCheck.io](http://www.scholarcheck.io/). This module requires a ScholarCheck API Token to function.

[![NPM Version](https://img.shields.io/npm/v/scholarcheck.svg)](https://www.npmjs.com/package/scholarcheck) [![CircleCI Status](https://img.shields.io/circleci/project/caffeinewriter/node-scholarcheck.svg)](https://circleci.com/gh/caffeinewriter/node-scholarcheck) [![CodeClimate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg)](https://codeclimate.com/github/caffeinewriter/node-scholarcheck) [![License: MIT](https://img.shields.io/npm/l/scholarcheck.svg)](https://www.npmjs.com/package/scholarcheck) [![Dependency Status](https://david-dm.org/caffeinewriter/node-scholarcheck.svg)](https://david-dm.org/caffeinewriter/node-scholarcheck) [![devDependency Status](https://david-dm.org/caffeinewriter/node-scholarcheck/dev-status.svg)](https://david-dm.org/caffeinewriter/node-scholarcheck#info=devDependencies)

## Documentation

### Setup
```javascript
var ScholarCheck = require('scholarcheck');
var scholarcheck = new ScholarCheck('API_TOKEN');

scholarcheck.valid('ap25@cam.ac.uk', function (err, valid) {
  console.log(valid); //true
});
scholarcheck.valid('ei12038@fe.up.pt', function (err, valid) {
  console.log(valid); //true
});
scholarcheck.institution('ei12038@fe.up.pt', function (err, institution) {
  console.log(institution);  //"Universidade do Porto"
});
```

### `ScholarCheck.valid(email, cb(err, valid))`
Returns the passed callback function with `err` as `null` if the query was sucessful, and a boolean representation of if `email` is a valid institutional email, or `err` as the returned error if the check was unsuccessful.

### `ScholarCheck.institution(email, cb(err, institution))`
Returns the passed callback function with `err` as `null` if the query was sucessful, and a string containing the name of the institution as `institution`, or `err` as the returned error if the check was unsuccessful.

### `ScholarCheck.rawData(email, cb(err, data))`
Returns the passed callback function with `err` as `null` if the query was sucessful, and an object containing the properties `valid` as a boolean, and `institutionName` as a string, or `err` as the returned error if the check was unsuccessful.
