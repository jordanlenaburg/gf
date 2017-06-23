var app = angular.module("GamesApp");

app.service("FindSessionsService", ["$http", function ($http) {

    this.getSessions = function () {
        return $http.get("/allSessions").then(function (response) {
            return response.data;
        });
    };


}]);

app.service("CreateSessionsService", ["$http", function ($http) {

    this.getSessions = function () {
        return $http.get("/allSessions").then(function (response) {
            return response.data;
        });
    };

    this.createSession = function (session) {
        return $http.post("/api/sessionMaster", session).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    this.updateSession = function (change) {
        return $http.post("/api/sessionMaster", change).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

}]);

app.controller("createSessionController", ["$scope", "CreateSessionsService", "UserService", function ($scope, createSessionsService, UserService) {

    $scope.session = {};
    $scope.sessions = [];
    $scope.userService = UserService;

    (function getSessions() {
        SessionsService.getSessions().then(function (sessions) {
            $scope.sessions = sessions;
        });
    })();

    $scope.saveSession = function (session) {
        SessionsService.saveSession(session).then(function (session) {
            $scope.sessions.push(session);
            $scope.session = {};

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
