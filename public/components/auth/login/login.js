var app = angular.module("GamesApp.Auth");

app.controller("LoginController", ["$scope", "$location", "$localStorage", "UserService", function ($scope, $location, $localStorage, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function(response) {
            $localStorage.state = response.data.user.state;
            $localStorage.myStore = response.data.user.myStore;
            $localStorage.name = response.data.user.username;
            $location.path("/showStores");
        }, function(response) {
            toastr.error(response.data.message);
        });
    };
}]);
