var app = angular.module("GamesApp.Auth");

app.controller("LoginController", ["$scope", "$location", "$localStorage", "UserService", function ($scope, $location, $localStorage, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function(response) {
            $localStorage.state = response.data.user.state;
            $localStorage.myStore = response.data.user.myStore;
            $localStorage.name = response.data.user.username;
            $localStorage.userId = response.data.user._id;
            console.log(response.data.user)
            $location.path("/showStores");
        }, function(response) {
            toastr.error(response.data.message);
        });
    };
}]);
