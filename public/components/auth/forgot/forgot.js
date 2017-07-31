angular.module("GamesApp.Auth")

.controller("ForgotPasswordController", ["$scope", "UserService", function ($scope, UserService) {
    $scope.forgotPassword = function(email) {
        UserService.forgotPassword(email).then(function(response) {
            alert(response.data.message);
        }, function (response) {
            alert(response.data.message);
        });
    };
}]);
