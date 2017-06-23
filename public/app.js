var app = angular.module("GamesApp", ["ngRoute", "GamesApp.Auth"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html",
            controller: "StoresController"
        })
        .when("/games", {
            templateUrl: "components/games/games.html",
            controller: "GamesController"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "ProfileController"
        })
        .when("/findSession", {
            templateUrl: "components/sessions/sessions.html",
            controller: "findSessionsController"
        })
        .when("/createSession", {
            templateUrl: "components/sessions/sessions.html",
            controller: "createSessionController"
        })
        .when("/showStores", {
        templateUrl: "components/stores/stores.html",
        controller: "StoresController"
    })

}]);
