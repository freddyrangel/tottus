'use strict';

angular.module('mean.post-announcements').factory('PostAnnouncements', ['$resource', function($resource) {

    return $resource('posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);