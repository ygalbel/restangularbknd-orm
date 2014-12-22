'use strict';

angular.module('myApp.item', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/item', {
    templateUrl: 'views/item/item.html',
    controller: 'itemCtrl'
  });
}])


.controller('itemCtrl', ['$scope', '$log', 'Restangular', function ($scope, $log, Restangular) {

    $scope.readItem = function () {
        $scope.result = "Connecting...";
        Restangular.one('Employees', 3).get().then(function (Employee) {
            $scope.result = "\n" + JSON.stringify(Employee, null, "\t");
        }, function (response) {
            $scope.handleError(response);
        })
    }

    $scope.updateItem = function () {
        $scope.result = "Connecting...";
        Restangular.one('Employees', 3).get().then(function (Employee) {
            if (Employee.First_Name == "updatedItem") Employee.First_Name = "Jan";
            else Employee.First_Name = "updatedItem";
            Employee.put({ returnObject: true }).then(function (Employee) {
                $scope.result = "\n" + JSON.stringify(Employee, null, "\t");
            }, function (response) {
                $scope.result = "Error: " + response.status;
            });
        }, function (response) {
            $scope.handleError(response);
        });
    }

    $scope.deleteItem = function () {
        $scope.result = "Connecting...";
        Restangular.all('Employees').getList({ pageSize: 10, filter: JSON.stringify([{ fieldName: "First_Name", operator: "contains", value: "j" }]) }).then(function (Employees) {
            $scope.result = Employees[Employees.length - 1].remove().then(function (result) {
                $scope.result = "\n" + JSON.stringify(result, null, "\t");
            }, function (response) {
                $scope.result = "Error: " + response.status;
            });
        }, function (response) {
            $scope.handleError(response);
        });
    }

    $scope.createItem = function () {
        $scope.result = "Connecting...";
        $scope.result = Restangular.all('Employees').post({ First_Name: "John", Last_Name: "Smith" }, { returnObject: true }).then(function (Employee) {
            $scope.result = "\n" + JSON.stringify(Employee, null, "\t");
        }, function (response) {
            $scope.handleError(response);
        });
    }

    $scope.handleError = function (response) {
        if (response.status == 401) {
            $scope.result = "Please sign in first.";
        }
        else {
            $scope.result = "Error: " + response.status;
        }
    }
}]);