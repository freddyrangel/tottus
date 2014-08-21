'use strict';

angular.module('mean.post-announcements').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('postAnnouncements example page', {
      url: '/postAnnouncements/example',
      templateUrl: 'post-announcements/views/index.html'
    });
  }
]);
