var app = angular.module("GamesApp");


app.service("CreateSessionService", ["$http", function ($http) {

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

app.controller("CreateSessionController", ["$scope", "CreateSessionService", "UserService", function ($scope, CreateSessionService, UserService) {

    $scope.session = {};
    $scope.sessions = [];
    $scope.userService = UserService;

    (function getSessions() {
        CreateSessionService.getSessions().then(function (sessions) {
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

