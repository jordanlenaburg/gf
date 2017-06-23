var app = angular.module("GamesApp");

app.service("StoresService", ["$http", function ($http) {

    this.getStores = function (state) {
        return $http.get("/stores/"+state).then(function (response) {
            return response.data;
        });
    };


}]);

app.controller("StoresController", ["$scope", "StoresService", "UserService", function ($scope, StoresService, UserService) {

    $scope.store = {};
    $scope.test = "hi";
    $scope.stores = [];
    $scope.userService = UserService;

    $scope.getStores = function(state) {
        StoresService.getStores(state).then(function (stores) {
            $scope.stores = stores;
        });
    };

    $scope.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];





}]);
