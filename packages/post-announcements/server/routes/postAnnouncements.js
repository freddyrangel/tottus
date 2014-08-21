'use strict';

// The Package is past automatically as first parameter
module.exports = function(PostAnnouncements, app, auth, database) {

  app.get('/postAnnouncements/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/postAnnouncements/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/postAnnouncements/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/postAnnouncements/example/render', function(req, res, next) {
    PostAnnouncements.render('index', {
      package: 'post-announcements'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
