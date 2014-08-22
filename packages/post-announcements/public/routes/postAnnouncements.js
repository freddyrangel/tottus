'use strict';

angular.module('mean.post-announcements').config(['$stateProvider',
  function($stateProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location) {
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function(user) {
      // Authenticated
      if (user !== '0') $timeout(deferred.resolve);

      // Not Authenticated
      else {
        $timeout(deferred.reject);
        $location.url('/login');
      }
    });

    return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all posts', {
        url: '/posts',
        templateUrl: 'post-announcements/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create post', {
        url: '/posts/create',
        templateUrl: 'post-announcements/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit post', {
        url: '/posts/:postId/edit',
        templateUrl: 'post-announcements/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('post by id', {
        url: '/posts/:postId',
        templateUrl: 'post-announcements/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
