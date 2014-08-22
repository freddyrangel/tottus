'use strict';

angular.module('mean.post-announcements').controller('PostAnnouncementsController', ['$scope', '$stateParams', '$location', 'Global', 'PostAnnouncements',
  function($scope, $stateParams, $location, Global, PostAnnouncements) {
    $scope.global = Global;
    $scope.package = {
      name: 'post-announcements'
    };

    $scope.hasAuthorization = function(post) {
      if (!post || !post.user) return false;
      return $scope.global.isAdmin || post.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var post = new Posts({
          content: this.content
        });
        post.$save(function(response) {
          $location.path('posts/' + response._id);
        });

        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(post) {
      if (post) {
        post.$remove();

        for (var i in $scope.posts) {
          if ($scope.posts[i] === post) {
            $scope.posts.splice(i, 1);
          }
        }
      } else {
        $scope.post.$remove(function(response) {
          $location.path('posts');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var post = $scope.post;
        if (!post.updated) {
          post.updated = [];
        }
        post.updated.push(new Date().getTime());

        post.$update(function() {
          $location.path('posts/' + post._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Posts.query(function(posts) {
        $scope.posts = posts;
      });
    };

    $scope.findOne = function() {
      Posts.get({
        postId: $stateParams.postId
      }, function(post) {
        $scope.post = post;
      });
    };
  }
]);
