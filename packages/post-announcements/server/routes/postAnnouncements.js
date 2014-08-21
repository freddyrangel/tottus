'use strict';

var posts = require('../controllers/posts');


// Post authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.post.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Posts, app, auth) {

  app.route('/posts')
    .get(posts.all)
    .post(auth.requiresLogin, posts.create);
  app.route('/posts/:postId')
    .get(posts.show)
    .put(auth.requiresLogin, hasAuthorization, posts.update)
    .delete(auth.requiresLogin, hasAuthorization, posts.destroy);

  // Finish with setting up the postId param
  app.param('postId', posts.post);
};

// The Package is past automatically as first parameter
//module.exports = function(PostAnnouncements, app, auth, database) {

  //app.get('/postAnnouncements/example/anyone', function(req, res, next) {
    //res.send('Anyone can access this');
  //});

  //app.get('/postAnnouncements/example/auth', auth.requiresLogin, function(req, res, next) {
    //res.send('Only authenticated users can access this');
  //});

  //app.get('/postAnnouncements/example/admin', auth.requiresAdmin, function(req, res, next) {
    //res.send('Only users with Admin role can access this');
  //});

  //app.get('/postAnnouncements/example/render', function(req, res, next) {
    //PostAnnouncements.render('index', {
      //package: 'post-announcements'
    //}, function(err, html) {
      //Rendering a view from the Package server/views
      //res.send(html);
    //});
  //});
//};
