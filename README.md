#restangularbknd-orm

**plunkr demo of the example, (http://plnkr.co/edit/d6yDka?p=preview).

Following are the sources and example of how to use Backand's ORM with [Restangular](https://github.com/mgonto/restangular), one of the most popular Angular RESTful API components

#Table of contents

- [restangularbknd-orm](#restangularbknd-orm)
- [Short Description](#short-description)
- [How do I add this to my project?](#how-do-i-add-this-to-my-project)
- [Dependencies](#dependencies)
- [Starter Guide](#starter-guide)
  - [Configuration](##Configuration)
  - [Using restangularbknd-orm](##Using-restangularbknd-orm)
    - [Authorization](###Authorization)
- [License](#license)


#short-description

restangularbknd-orm has three services:
 * authorization
 * session
 * restangularbknd 

 The authorization  handles the OAuth2 authentication with Backand. It uses a POST verb and sends a username, password and appname (application name) and recieves an authentication token that is used for all further communication with Backand.
 The Session enables you to remain signed-in after the page is reloaded. It uses a cookie to persist the authentication token.
 The restangularbknd handles the Restangular Configuration. This enables you to use Restangular in your app


#How do I add this to my project?

You can download this by:

* Using bower and running `bower install restangularbknd-orm`
* Using npm and running `npm install restangularbknd-orm`
* Downloading it manually by clicking [here to download development unminified version](https://github.com/backand/restangularbknd-orm/blob/master/dist/restangularbknd-orm.debug.js) or [here to download minified production version](https://github.com/backand/restangularbknd-orm/blob/master/dist/restangularbknd-orm.min.js)


#Dependencies

restangularbknd-orm depends on angular, restangular and angular-cookies

#Starter Guide

##Configuration


````javascript
// Add Restangular as a dependency to your app
angular.module('your-app', ['restangularbknd-orm']);

// Inject restangularbknd-orm services into your authorization controller
angular.module('your-app').controller('Your Authorization Controller', function($scope, AuthService, SessionService, RestangularBknd) {
  // ...
});

// Inject Restangular into your controllers that require data
angular.module('your-app').controller('Your Controller', function($scope, Restangular) {
  // ...
});

````

## Using restangularbknd-orm

### Authorization

Use the authorization service in the controller that responsible to sign-in and sign out.
Call the signIn with username, password and appname, and in the success callback set the credentials, which are basically the auth token, into the session and restangularbknd services.

````javascript
.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', 'RestangularBknd', function ($scope, AuthService, SessionService, RestangularBknd) {

	$scope.signIn = function () {
        
		// send the username, password and appname to get an OAuth2 authentication token
		*AuthService.signIn*($scope.username, $scope.password, $scope.appname)
        .success(function (data, status, headers, config) {
			// handle success
            SessionService.setCredentials(data);
            RestangularBknd.setCredentials(SessionService.getAuthHeader());
        })
        .error(function (data, status, headers, config) {
			// handle error        

        });
    
    };

}]);

````

### Session

Use the session service in the controller that responsible to sign-in and sign out.
Call the signIn with username, password and appname, and in the success callback set the credentials, which are basically the auth token, into the session and restangularbknd services.

````javascript
.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', 'RestangularBknd', function ($scope, AuthService, SessionService, RestangularBknd) {

	$scope.signIn = function () {
        
		// send the username, password and appname to get an OAuth2 authentication token
		AuthService.signIn($scope.username, $scope.password, $scope.appname)
        .success(function (data, status, headers, config) {
			// handle success
            SessionService.setCredentials(data);
            RestangularBknd.setCredentials(SessionService.getAuthHeader());
        })
        .error(function (data, status, headers, config) {
			// handle error        

        });
    
    };

}]);

````


# License

The MIT License

Copyright (c) 2014 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mgonto/restangular/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
