var chai = require('chai');
var expect = chai.expect;
var path = require('path');
var Scholarcheck = require(path.join(__dirname, '../lib'));
var s = new Scholarcheck(process.env.SCHOLARCHECK_TOKEN);

describe('Scholarcheck', function() {
  it('should be an object', function() {
    expect(s).to.be.an('object');
  });
  it('should be an instance of Scholarcheck', function() {
    expect(s).to.be.an.instanceOf(Scholarcheck);
  });
  describe('#_apiCall()', function() {
    it('should return raw API data from endpoint', function() {
      s._apiCall('email/flastname@mit.edu', function(err, data) {
        expect(data).to.be.an('object').with.keys(['valid', 'institution']);
      });
    });
  });
  describe('#verify()', function() {
    it('should return true on academic emails', function() {
      s.valid('m.e.jager@uva.nl', function (err, valid) {
        expect(valid).to.be.true;
      });
      s.valid('jdubois@upmc.fr', function (err, valid) {
        expect(valid).to.be.true;
      });
      s.valid('b.anzaldi3203@student.sbccd.edu', function (err, valid) {
        expect(valid).to.be.true;
      });
    });
    it('should return false on non-academic emails', function() {
      s.valid('brandon@brandonanzaldi.com', function (err, valid) {
        expect(valid).to.be.false;
      });
      s.valid('someemail@gmail.com', function (err, valid) {
        expect(valid).to.be.false;
      });
      s.valid('anotheremail@yahoo.com', function (err, valid) {
        expect(valid).to.be.false;
      });
    });
  });
  describe('#institution()', function() {
    it('should return the institution name', function () {
      s.institution('ei12038@fe.up.pt', function (err, institution) {
        expect(institution).to.equal('Universidade do Porto');
      });
      s.institution('flastname@mit.edu', function (err, institution) {
        expect(institution).to.equal('Massachusetts Institute of Technology');
      });
    });
  });
  describe('#rawdata()', function() {
    it('should return the raw API data', function() {
      s.rawData('flastname@mit.edu', function(err, data) {
        expect(data).to.be.an('object').with.keys(['valid', 'institution']);
      });
    });
  });
});
