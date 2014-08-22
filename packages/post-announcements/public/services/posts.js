'use strict';

angular.module('mean.post-announcements').factory('Posts', ['$resource', function($resource) {

    return $resource('posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
