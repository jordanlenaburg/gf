var app = angular.module("GamesApp");

app.service("GamesService", ["$http", function ($http) {

    this.getGames = function () {
        return $http.get("/games").then(function (response) {
            return response.data;
        });
    };

    this.saveGames = function (game) {
        return $http.post("/games", todo).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.allGames = function() {
        return $http.get("/allGames").then(function (response){
            return response.data;
        });
    };
}]);

app.controller("GamesController", ["$scope", "GamesService", "UserService", function ($scope, GamesService, UserService) {

    $scope.game = {};
    $scope.games = [];
    $scope.userService = UserService;

    (function getGames() {
        GamesService.getGames().then(function (games) {
            console.log(games);
            $scope.games = games;
        });
    })();

    $scope.saveGame = function (game) {
        GamesService.saveGame(game).then(function (game) {

            $scope.games.push(game);
            $scope.game = {};

        });
    };
}]);
