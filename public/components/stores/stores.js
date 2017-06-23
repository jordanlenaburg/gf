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
    $scope.stores = [];
    $scope.userService = UserService;


    var state = localStorage.getItem('state');
    $scope.getStores = function(state) {
        console.log('state: ' + state)
        StoresService.getStores(state).then(function (stores) {
            $scope.stores = stores;
            console.log('stores controller')
            console.log(stores);
        });
    };
    $scope.getStores();

}]);
