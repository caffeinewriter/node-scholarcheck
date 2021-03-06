var request = require('request');

/**
 * Constructor for the Scholarcheck module.
 * @constructor
 * @param {string} apiKey - ScholarCheck.io API key
 */
var Scholarcheck = function(apiKey) {
  this.apiUrl = "https://app.scholarcheck.io/api/v1/";
  this.apiKey = apiKey || '';
};

/**
 * Internal API call method that returns raw data from an endpoint.
 * @param {string} endpoint - The endpoint to use in the request.
 * @param {Scholarcheck~apiCallback} callback - A callback to handle the returned data.
 */

Scholarcheck.prototype._apiCall = function(endpoint, callback) {
  var options = {
    url: this.apiUrl + endpoint,
    headers: {
      'Token': this.apiKey
    }
  };
  request(options, function(err, res, body) {
    callback(err, JSON.parse(body));
  });
};

/**
 * @callback Scholarcheck~apiCallback
 * @param {string} err - Any error that occured. Otherwise null.
 * @param {object} data - Raw API data returned.
 */

/**
 * Returns true in the callback if the email is a valid institutional email.
 * @param {string} email - An email to test for validity
 * @param {Scholarcheck~validCallback} cb - Calback that returns validity.
 */

Scholarcheck.prototype.valid = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return cb(err);
    }
    return cb(null, data.valid);
  });
};

/**
 * @callback Scholarcheck~validCallback
 * @param {string} err - Any error that occured. Otherwise null.
 * @param {boolean} valid - True if email is institutional, otherwise false.
 */

/**
 * Returns the institution name in the callback if the email is a valid institutional email.
 * @param {string} email - An email to test for validity
 * @param {Scholarcheck~institutionCallback} cb - Calback that returns institution.
 */

Scholarcheck.prototype.institution = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      cb(err);
    }
    return cb(null, data.institutionName);
  });
};


/**
 * @callback Scholarcheck~institutionCallback
 * @param {string} err - Any error that occured. Otherwise null.
 * @param {string} institution - True if email is institutional, otherwise false.
 */

/**
 * Returns the raw data from the email endpoint.
 * @param {string} email - An email to test for validity
 * @param {Scholarcheck~rawCallback} cb - Calback that returns the raw data.
 */

Scholarcheck.prototype.rawData = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return cb(err);
    }
    return cb(null, data);
  });
};

/**
 * @callback Scholarcheck~rawCallback
 * @param {string} err - Any error that occured. Otherwise null.
 * @param {object} data - Raw API data returned.
 */

module.exports = Scholarcheck;
