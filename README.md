# node-scholarcheck
Node API wrapper for ScholarCheck.io

##Documentation
-----
###Setup
```javascript
var Scholarcheck = require('scholarcheck');
var scholarcheck = new Scholarcheck('API_TOKEN');
```

###`Scholarcheck.valid(email)`
Returns `true` if `email` is a valid institutional email, `false` if it's not, or `undefined` on error.

###`Scholarcheck.institution(email)`
Returns the institution's name as a string if `email` is a valid institutional email, an empty string if it's not a valid institutional email, or `undefined` on error.

###`Scholarcheck.rawData(email)`
Returns the raw data object with `valid` and `institution` as keys. It will return with `err: true` as a key, as well as `valid` and `institution` set to `undefined` if there is an error.
