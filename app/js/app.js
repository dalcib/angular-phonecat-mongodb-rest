'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
angular.module('myApp', [ 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/phones', {template: 'partials/phone-list.html',   controller: PhoneListCtrl});
    $routeProvider.when('/phones/new',  {template: 'partials/phone-form.html', controller: PhoneNewCtrl});
    $routeProvider.when('/phones/aggregation',  {template: 'partials/phone-aggre.html', controller: PhoneAggreCtrl});
    $routeProvider.when('/phones/:_id', {template: 'partials/phone-detail.html', controller: PhoneDetailCtrl});
    $routeProvider.when('/phones/edit/:_id', {template: 'partials/phone-form.html', controller: PhoneEditCtrl});
    $routeProvider.otherwise({redirectTo: '/phones'});

    //$locationProvider.html5Mode(true);

    /*$rootScope.$on('$afterRouteChange', function(){
      $window.scrollTo(0,0);
    });*/
  }]);


