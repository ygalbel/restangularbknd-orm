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
    - [Authentication](###Authentication)
    - [Session](###Session)
    - [Restangular Backand Configuration](###Restangular-Backand-Configuration)
  - [Using Backand ORM with Restangular](##Using-Backand-ORM-with-Restangular)
- [License](#license)


#short-description

restangularbknd-orm has three services:
 * auth (authentication)
 * session
 * restangularbknd (Restangular Backand Configuration)

 The Auth service handles the OAuth2 authentication with Backand. It uses a POST verb and sends a username, password and appname (application name) and recieves an authentication token that is used for all further communication with Backand.
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

### Authentication

Use the Authentication service in the controller that responsible to sign-in and sign out.
Call the signIn with username, password and appname, and in the success callback set the credentials, which are basically the auth token, into the session and restangularbknd services.

````javascript
.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', 'RestangularBknd', function ($scope, AuthService, SessionService, RestangularBknd) {

	$scope.signIn = function () {
        
		// send the username, password and appname to get an OAuth2 authentication token
		/****** Authentication Service Usage ********/
		AuthService.signIn($scope.username, $scope.password, $scope.appname)
		/********************************************/
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
Set the credentials in the sign-in success callback.
Remove them to sign out

````javascript
.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', 'RestangularBknd', function ($scope, AuthService, SessionService, RestangularBknd) {

	$scope.signIn = function () {
        
		// send the username, password and appname to get an OAuth2 authentication token
		AuthService.signIn($scope.username, $scope.password, $scope.appname)
        .success(function (data, status, headers, config) {
			// handle success
			/****** Session Service Usage ********/
			SessionService.setCredentials(data);
			/*************************************/
            RestangularBknd.setCredentials(SessionService.getAuthHeader());
        })
        .error(function (data, status, headers, config) {
			// handle error        
        });
    };

	$scope.signOut = function () {
		/****** Session Service Usage ********/
        **SessionService**.clearCredentials();
        /*************************************/
        RestangularBknd.clearCredentials();
    };

}]);

````

When the application starts, call them to set them into Restangular

````javascript
myApp.run(function (RestangularBknd, SessionService) {
    RestangularBknd.config();
	/****** Session Service Usage ********/
    var authHeader = SessionService.getAuthHeader();
    /*************************************/
    RestangularBknd.setCredentials(authHeader);
});
````

### Restangular Backand Configuration

Configure the Restangular when the application starts,
and set the credentials from the session (cookie) if there are any

````javascript
myApp.run(function (RestangularBknd, SessionService) {
    /****** RestangularBknd Service Usage ********/
    RestangularBknd.config();
	/*********************************************/
	var authHeader = SessionService.getAuthHeader();
    /****** RestangularBknd Service Usage ********/
    RestangularBknd.setCredentials(authHeader);
	/*********************************************/
});
````

set the credentials after authentication

````javascript
.controller('authorizationCtrl', ['$scope', 'AuthService', 'SessionService', 'RestangularBknd', function ($scope, AuthService, SessionService, RestangularBknd) {

	$scope.signIn = function () {
        
		// send the username, password and appname to get an OAuth2 authentication token
		AuthService.signIn($scope.username, $scope.password, $scope.appname)
        .success(function (data, status, headers, config) {
			// handle success
			SessionService.setCredentials(data);
			/****** RestangularBknd Service Usage ********/
			RestangularBknd.setCredentials(SessionService.getAuthHeader());
			/*********************************************/
        })
        .error(function (data, status, headers, config) {
			// handle error        
        });
    };

}]);

````

##Using Backand ORM with Restangular

If you do not already familiar with Restangular,
Click on Restangular to learn more.

With the authentication and the Restangular configuration setteled we can perform all the CRUD operations:

###List

Call Restangular with the following parameters to get a list:

* **pageSize** the number of returned items in each getList call
* **pageNumber** The page number starting with 1


````javascript
Restangular.all('Employees').getList({ pageSize: 5, filter: JSON.stringify([{ fieldName: "First_Name", operator: "contains", value: "j" }]) }).then(function (Employees) {
            $scope.result = "\n" + JSON.stringify(Employees, null, "\t");
        }, function (response) {
            $scope.handleError(response);
        });
		
````
###One Item

###Create

###Update

###Delete

# License

The MIT License

Copyright (c) 2014 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mgonto/restangular/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
