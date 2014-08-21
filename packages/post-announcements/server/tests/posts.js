'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

/**
 * Globals
 */
var user;
var post;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Post:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        post = new Post({
          title: 'Post Title',
          content: 'Post Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return post.save(function(err) {
          should.not.exist(err);
          post.content.should.equal('Post Content');
          post.user.should.not.have.length(0);
          post.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        post.content = '';

        return post.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        post.user = {};

        return post.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      post.remove();
      user.remove();
      done();
    });
  });
});
