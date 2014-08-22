'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Wall = mongoose.model('Wall');

/**
 * Globals
 */
var user;
var wall;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Wall:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });


      user.save(function() {

        wall = new Wall({
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return wall.save(function(err) {
          should.not.exist(err);
          wall.user.should.not.have.length(0);
          wall.created.should.not.have.length(0);
          done();
        });
      });

      it('should return the right user', function(done) {
        return wall.save(function(err) {
          wall.user.should.equal(user._doc._id);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        wall.user = {};

        return wall.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    afterEach(function(done) {
      wall.remove();
      wall.remove();
      user.remove();
      done();
    });
  });
});
