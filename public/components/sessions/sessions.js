var app = angular.module("GamesApp");

app.service("FindSessionsService", ["$http", function ($http) {

    this.getSessions = function () {
        return $http.get("/allSessions").then(function (response) {
            return response.data;
        });
    };


}]);


app.controller("findSessionsController", ["$scope", "findSessionsService", "UserService", function ($scope, findSessionsService, UserService) {

    $scope.session = {};
    $scope.sessions = [];
    $scope.userService = UserService;

    (function getSessions() {
        findSessionsService.getSessions().then(function (sessions) {
            $scope.sessions = sessions;
        });
    })();

}]);
