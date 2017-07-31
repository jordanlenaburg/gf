var app = angular.module("GamesApp.Auth");

app.controller("LogoutController", ["UserService", function(UserService) {
    UserService.logout();
}]);
