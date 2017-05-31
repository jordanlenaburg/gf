var app = angular.module("GamesApp.Auth");

app.controller("SignupController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.passwordMessage = "";
    $scope.signup = function (user) {
        if (user.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords do not match.";
        } else {
            UserService.signup(user).then(function(response) {
                toastr.success(response.data.message);
                $location.path("/login");
            }, function(response) {
                toastr.error(response.data.message);
            });
        }
    }
}]);
