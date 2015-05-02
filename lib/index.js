var request = require('request');
var Scholarcheck = function(apiKey) {
  this.apiUrl = "https://app.scholarcheck.io/api/v1/";
  this.apiKey = apiKey || '';
};

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

Scholarcheck.prototype.valid = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return cb(err);
    }
    return cb(null, data.valid);
  });
};

Scholarcheck.prototype.institution = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      cb(err);
    }
    return cb(null, data.institutionName);
  });
};

Scholarcheck.prototype.rawData = function(email, cb) {
  var apiReq = 'email/' + email;
  this._apiCall(apiReq, function(err, data) {
    if (!!err) {
      return cb(err);
    }
    return cb(null, data);
  });
};

module.exports = Scholarcheck;
