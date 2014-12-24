Click here for the Plunker demo of the example: http://plnkr.co/edit/Himh9XP2tNn07VJDFtF8?p=preview



The following are the sources and the example of how to use Backand's ORM with [Restangular](https://github.com/mgonto/restangular), one of the most popular Angular RESTful API components.


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
- [Run the example](#Run-the-example)
- [License](#license)


#Short Description

restangularbknd-orm has three services:
 
* Auth (authentication)
 
* Session
 
* restangularbknd (Restangular Backand Configuration)

 

The Auth service handles the OAuth2 authentication with Backand. It uses a POST verb and sends a username, password and appname (application name) and recieves an authentication token that is used for all further communication with Backand.
 By using a cookie to persist the authentication token, the Session enables you to remain signed-in after the page is reloaded. The restangularbknd handles the Restangular Configuration by enabling you to use Restangular in your app.




#How do I add this to my project?


You can download this by:


* Using bower and running `bower install restangularbknd-orm`

* Using npm and running `npm install restangularbknd-orm`

* Downloading it manually by clicking [development unminified version](https://github.com/backand/restangularbknd-orm/blob/master/dist/restangularbknd-orm.debug.js) or [minified production version](https://github.com/backand/restangularbknd-orm/blob/master/dist/restangularbknd-orm.min.js)




#Dependencies


restangularbknd-orm depends on AngularJS, Restangular and angular-cookies.js



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


Use the Authentication service in the controller that is responsible for sign-in and sign-out.
 Call the sign-in with username, password and appname, and in the success callback set the credentials, which are basically the auth token, into the session and restangularbknd services.

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


Use the session service in the controller that is responsible for sign-in and sign-out. 
Set the credentials in the sign-in success callback and rRemove them to sign out. 

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
        SessionService.clearCredentials();
        /*************************************/
        RestangularBknd.clearCredentials();
    };

}]);


````

When the application starts, call them to set them into Restangular.

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


Configure the Restangular when the application starts 
and set the credentials from the session (cookie) if there are any.

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
Set the credentials after authentication.

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


If you aren't familiar with Restangular, click here [https://github.com/mgonto/restangular] to learn more. 

With the authentication and Restangular configurations settled you can perform all the CRUD operations:


###List


Call Restangular getList with the following parameters to get a list:


* **pageSize** The number of returned items in each getList call, default 20.

* **pageNumber** The page number starting with 1, default 1.

* **filter** A stringified array where each item has the properties fieldName, operator and value. The operator options depend on the field type.

* **sort** A stringified array where each item has the properties fieldName and order. The order options are "asc" or "desc".

* **search** Free text search.

* **deep** When set to true, brings the related parent rows in the relatedTables property.
* **withSelectOptions** When set to true, get a text value collection to load select options according to parent relations.

````javascript

var getListParameters = {
	pageSize: 5,
	pageNumber: 1,
	filter: JSON.stringify([{ fieldName: "Name", operator: "contains", value: "j" }, { fieldName: "Amount", operator: "greaterThan", value: "6" }]),
	sort: JSON.stringify([{ fieldName: "Name", order: "asc" }]),
	search: "",
	deep: false,
	withSelectOptions: false 
}

Restangular.all('Some table').getList(getListParameters).then(function (list) {
            // handle the list
        }, function (response) {
            // handle errors
        });
		
````

###One Item


Call Restangular with a specific id and with the following parameters to get a specific item:


* **id** The id is the primary kay value of a table row 

* **deep** When set to true, brings the related parent and child rows


````javascript

var id = 3012;

var getParameters = {
	deep: false
}

Restangular.one('Some table', id).get(getParameters).then(function (item) {
            // handle the item
        }, function (response) {
            // handle errors
        })

````



###Create


Call Restangular post with a new object to create, with the following parameters:


* **returnObject** Set this to true when you have server side business rules that causes additional changes to the object. In that case this request will return the created object:


````javascript

var objectToCreate = {
	name: "John",
	Amount: 15
};

var postParameters = {
	returnObject: true
};

Restangular.all('Some table').post(objectToCreate, postParameters).then(function (item) {
            // handle the item
        }, function (response) {
            // handle errors
        });

````



###Update


Call Restangular put to update an existing object with the following parameters:


* **returnObject** Set this to true when you have server side business rules, causing additional changes to the object. In this case the request will return the created object:

````javascript

var id = 3012;

var putParameters = {
	returnObject: true
};

// get an existing item, you can use getList to get an array an well
Restangular.one('Some table', id).get().then(function (item) {
            item.Amount = 17;
			// save the changes
			item.put(putParameters).then(function (item) {
				// handle the item
            }, function (response) {
				// handle errors
            });
        }, function (response) {
            // handle errors
        });

````



###Delete


Call Restangular remove to delete an item from a list:


````javascript

Restangular.all('Some table').getList().then(function (list) {
			// delete the last item in the list
            list[list.length - 1].remove().then(function (response) {
                // handle success
            }, function (response) {
				// handle errors
            });
        }, function (response) {
            // handle errors
        });
````


# Run the example

From the example folder run `bower install`. This should create the bower_components folder under example/app and then run.  Or you can go to Plunker [http://plnkr.co/edit/Himh9XP2tNn07VJDFtF8?p=preview] and play with it.




# License


The MIT License

Copyright (c) 2014 Backand http://www.backand.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

