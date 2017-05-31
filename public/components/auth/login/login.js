var app = angular.module("GamesApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.login = function (user) {
        UserService.login(user).then(function(response) {
            $location.path("/games");
        }, function(response) {
            console.log('new user fail ');
            toastr.error(response.data.message);
        });
    };
}]);
