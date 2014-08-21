'use strict';

angular.module('mean.post-announcements').controller('PostAnnouncementsController', ['$scope', 'Global', 'PostAnnouncements',
  function($scope, Global, PostAnnouncements) {
    $scope.global = Global;
    $scope.package = {
      name: 'post-announcements'
    };
  }
]);
