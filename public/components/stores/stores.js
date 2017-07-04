var app = angular.module("GamesApp");

app.service("StoresService", ["$http", "$localStorage", function ($http, $localStorage) {

    this.getStores = function () {
        var state = $localStorage.state;
        return $http.get("/stores/" + state).then(function (response) {
            return response.data;
        });
    };
    this.byStateGetStores = function (state) {
        return $http.get("/stores/" + state).then(function (response) {
            return response.data;
        });
    };

    this.makeFavoriteStore = function (store) {
        return $http.get("/api/sessionMaster/makeStoreFavorite/" + store).then(function (response) {
            return response.data
        })
    }

    this.getSessions = function (storeId) {
        return $http.get("/storeSessions/" + storeId).then(function (response) {
            return response.data;
        })
    }

    this.deleteMySession = function (sessionId) {
        return $http.delete("/api/sessionMaster/deleteMySession/" + sessionId).then(function (response) {
            return response.data
        })
    }

    this.joinSession = function (sessionId) {
        return $http.get("/api/sessionMaster/joinSession/" + sessionId).then(function (response) {
            return response;
        })
    }

    this.exitSession = function (sessionId) {
        return $http.get("/api/sessionMaster/exitSession/" + sessionId).then(function (response) {
            return response;
        })
    }


}]);

app.controller("StoresController", ["$scope", "$localStorage", "$location", "StoresService", "UserService", function ($scope, $localStorage, $location, StoresService, UserService) {

    $scope.store = {};
    $scope.stores = [];
    $scope.userService = UserService;
    $scope.showSession = false;
    $scope.showJoinButton = true;
    $scope.myState = $localStorage.state;
    $scope.myStore = $localStorage.myStore || 'None';

    $scope.states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    $scope.getStores = function () {
        StoresService.getStores().then(function (stores) {
            $scope.stores = stores;
            if ($localStorage.state) $scope.newState = $localStorage.state;

        });
    };
    $scope.getStores();

    $scope.deleteMySession = function (sessionId) {
        console.log('sessionId: ' + sessionId);
        StoresService.deleteMySession(sessionId).then(function (response) {
            toastr.success(response.message)
            $scope.stores = [];
        }, function (response){
            toastr.error(response.message)
        })

    }

    $scope.makeFavoriteStore = function (store) {
        StoresService.makeFavoriteStore(store).then(function (response) {
            toastr.success(response.message)
        }, function (response) {
            toastr.error(response.message);
        })
    }

    $scope.changeState = function (newState) {
        StoresService.byStateGetStores(newState).then(function (stores) {
            $scope.stores = stores
        })
    }

    $scope.sessionCreator = function (id) {
        $localStorage.store = id;
        $location.path('/createSession');
    }

    $scope.getSessions = function (storeId) {
        StoresService.getSessions(storeId).then(function (storeSessions) {
            $scope.storeSessions = storeSessions;
        })
    }

    $scope.joinSession = function (sessionId) {
        StoresService.joinSession(sessionId).then(function (response) {
            console.log(response)
            toastr.success(response.data.message);
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }

    $scope.exitSession = function (sessionId) {
        StoresService.exitSession(sessionId).then(function (response) {
            toastr.success(response.data.message)
            $location.path("/showStores");
        }, function (response) {
            toastr.error(response.data.message);
        })
    }

}]);

app.directive("logoFull", function () {
    return {
        template: '<img src="images/logoFull.png" alt="Gamefinder: Find Players.  Find Games.">'
    }
})
