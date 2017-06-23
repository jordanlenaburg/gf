var app = angular.module("GamesApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.login = function (user) {
        UserService.login(user).then(function(response) {
            console.log(response.data)
            console.log(response.data.user.state)
            localStorage.setItem('state', response.data.user.state);
            $location.path("/showStores");
        }, function(response) {
            console.log('We have an error, people!');
            toastr.error(response.data.message);
        });
    };
}]);
