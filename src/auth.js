(function() {
  'use strict';

  function AuthService($http, CONSTS) {

    var self =this;

    self.signIn = function (userName, password, appName) {
      return $http({
        method: 'POST',
        url: CONSTS.backandUrl + '/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          grant_type : 'password',
          username : userName,
          password : password,
          appname: appName
        }
      }
      )};

    self.signUp = function (fullName, email, password) {
      return $http({
          method: 'POST',
          url: CONSTS.backandUrl + '/api/account/signUp',
          data: {
            fullName : fullName,
            email : email,
            password : password,
            confirmPassword : password
          }
        }
      )};

    self.forgot = function (email) {
      return $http({
          method: 'POST',
          url: CONSTS.backandUrl + '/api/account/SendChangePasswordLink',
          data: {
              username : email
          }
        }
      )};

    self.resetPassword = function (password, id) {
      return $http({
          method: 'POST',
          url: CONSTS.backandUrl + '/api/account/changePassword',
          data: {
            confirmPassword: password,
            password: password,
            token: id
          }
        });
    };

  }

    angular.module('restangularbknd-orm')
    .service('AuthService', ['$http', 'CONSTS', AuthService])

})();
