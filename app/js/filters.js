/* http://docs.angularjs.org/#!angular.filter */


angular.module('myApp.filters', []).
    filter('checkmark',  function () {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        }
    });
