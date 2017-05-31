var app = angular.module("GamesApp", ["ngRoute", "GamesApp.Auth"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html"
        })
        .when("/games", {
            templateUrl: "components/games/games.html",
            controller: "GamesController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController"
        })

}]);
