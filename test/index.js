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
  it('should have an API key loaded', function() {
    expect(s.apiKey).to.be.ok;
  });
  describe('#_apiCall()', function() {
    it('should return raw API data from endpoint', function(done) {
      s._apiCall('email/flastname@mit.edu', function(err, data) {
        if (err) return done(err);
        expect(data).to.be.an('object').with.keys(['valid', 'institutionName']);
        done();
      });
    });
  });
  describe('#verify()', function() {
    it('should return true on academic emails', function(done) {
      s.valid('m.e.jager@uva.nl', function (err, valid) {
        if (err) return done(err);
        expect(valid).to.be.true;
        s.valid('jjohnson@wisc.edu', function (err, valid) {
          if (err) return done(err);
          expect(valid).to.be.true;
          done();
        });
      });
    });
    it('should return false on non-academic emails', function(done) {
      s.valid('brandon@brandonanzaldi.com', function (err, valid) {
        if (err) return done(err);
        expect(valid).to.be.false;
        s.valid('fakeemail@gmail.com', function (err, valid) {
          if (err) return done(err);
          expect(valid).to.be.false;
          done();
        });
      });
    });
  });
  describe('#institution()', function() {
    it('should return the institution name', function (done) {
      s.institution('ei12038@fe.up.pt', function (err, institution) {
        if (err) return done(err);
        expect(institution).to.equal('Universidade do Porto');
        s.institution('testemail@mit.edu', function (err, institution) {
          if (err) return done(err);
          expect(institution).to.equal('Massachusetts Institute of Technology');
          done();
        });
      });
    });
  });
  describe('#rawdata()', function() {
    it('should return the raw API data', function(done) {
      s.rawData('flastname@mit.edu', function(err, data) {
        if (err) return done(err);
        expect(data).to.be.an('object').with.keys(['valid', 'institutionName']);
        expect(data.valid).to.be.true;
        expect(data.institutionName).to.equal('Massachusetts Institute of Technology');
        done();
      });
    });
  });
});
