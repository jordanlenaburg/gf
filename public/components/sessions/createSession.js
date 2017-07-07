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

app.controller("CreateSessionController", ["$scope", "$localStorage", "$location", "CreateSessionService", "UserService", "GamesService", function ($scope, $localStorage, $location, CreateSessionService, UserService, GamesService) {

    $scope.session = {};
    $scope.sessions = [];
    $scope.userService = UserService;
    $scope.store = $localStorage.storeId;
    $scope.created = false;



    $scope.getGames = function getGames() {
        GamesService.getGames().then(function (games) {
            $scope.games = games;
            $scope.session._game = games[0];
        });
    };

    $scope.createSession = function (session) {
        session._store = $localStorage.store;
        CreateSessionService.createSession(session).then(function(createdSession) {
            $scope.createdSession = createdSession.session;
            $scope.created = true;
            toastr.success(createdSession.message.message)
        })
    }

    $scope.getProfile = function () {
        $location.path('/profile');
    }

    function getSessions() {
        CreateSessionService.getSessions().then(function (sessions) {
            $scope.sessions = sessions;
        });
    };

    $scope.saveSession = function (session) {
        SessionsService.saveSession(session).then(function (session) {
            $scope.sessions.push(session);
            $scope.session = {};

        });
    };
}]);

