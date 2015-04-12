var request = require('request');

var Scholarcheck = function(apiKey) {
  this.apiUrl = "http://api.scholarcheck.io/api/v1/";
  this.apiKey = apiKey || '';
};

Scholarcheck.prototype._apiCall = function(endpoint, callback) {
  var options = {
    url: this.apiUrl + endpoint,
    headers: {
      'Token': this.apiKey
    }
  }
  request(options, function(err, res, body) {
    callback(err, JSON.parse(body));
  });
};

Scholarcheck.prototype.valid = function(email) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return undefined;
    }
    return data.valid;
  });
};

Scholarcheck.prototype.institution = function(email) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return undefined;
    }
    return data.institution;
  });
};

Scholarcheck.prototype.rawData = function(email) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      data = {
        err: true,
        valid: undefined,
        institution: undefined
      };
    }
    return data;
  });
};

module.exports = Scholarcheck;
