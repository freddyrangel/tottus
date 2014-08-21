'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var PostSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  wall: {
    type: Schema.ObjectId,
    ref: 'Wall'
  }
});

/**
 * Validations
 */
//ArticleSchema.path('title').validate(function(title) {
  //return !!title;
//}, 'Title cannot be blank');

//ArticleSchema.path('content').validate(function(content) {
  //return !!content;
//}, 'Content cannot be blank');

/**
 * Statics
 */
//ArticleSchema.statics.load = function(id, cb) {
  //this.findOne({
    //_id: id
  //}).populate('user', 'name username').exec(cb);
//};

mongoose.model('Post', PostSchema);
