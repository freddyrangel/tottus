'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  _ = require('lodash');


/**
 * Find post by id
 */
exports.post = function(req, res, next, id) {
  Post.load(id, function(err, post) {
    if (err) return next(err);
    if (!post) return next(new Error('Failed to load post ' + id));
    req.post = post;
    next();
  });
};

/**
 * Create a post
 */
exports.create = function(req, res) {
  var post = new Post(req.body);
  post.user = req.user;

  post.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the post'
      });
    }
    res.json(post);

  });
};

/**
 * Update a post
 */
exports.update = function(req, res) {
  var post = req.post;

  post = _.extend(post, req.body);

  post.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the post'
      });
    }
    res.json(post);

  });
};

/**
 * Delete a post
 */
exports.destroy = function(req, res) {
  var post = req.post;

  post.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the post'
      });
    }
    res.json(post);

  });
};

/**
 * Show a post
 */
exports.show = function(req, res) {
  res.json(req.post);
};

/**
 * List of Posts
 */
exports.all = function(req, res) {
  Post.find().sort('-created').populate('user', 'name username').exec(function(err, posts) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the posts'
      });
    }
    res.json(posts);

  });
};
