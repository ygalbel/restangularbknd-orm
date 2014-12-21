'use strict';

angular.module('myApp.authorization', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authorization', {
    templateUrl: 'views/authorization/authorization.html',
    controller: 'authorizationCtrl'
  });
}])


.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', '$log', 'RestangularBknd', function ($scope, AuthService, SessionService, $log, RestangularBknd) {

    $scope.user = "admin03@devitout.com";
    $scope.password = "123456";
    $scope.appName = "qa55";

    $scope.signIn = function () {
        console.log("authentication");
        
        $scope.result = "connecting...";
        AuthService.signIn($scope.user, $scope.password, $scope.appName)
        .success(function (data, status, headers, config) {
            SessionService.setCredentials(data);
            $scope.result = "authenticated";
            RestangularBknd.setCredentials(SessionService.getAuthHeader());
        })
        .error(function (data, status, headers, config) {
            $log.debug("authentication error", data, status, headers, config);
            $scope.result = "failed to authenticate";

        });
    
    };



    $scope.signOut = function () {
        SessionService.clearCredentials();
        RestangularBknd.clearCredentials();
        $scope.result = null;
    };

    $scope.result = null;

}]);