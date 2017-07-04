var app = angular.module("GamesApp");

app.controller("ProfileController", ["$scope", "UserService", "StoresService", function ($scope, UserService, StoresService) {

    //    $scope.userService = UserService;

    $scope.deleteMySession = function (sessionId) {
        console.log('sessionId: ' + sessionId);
        StoresService.deleteMySession(sessionId).then(function (response) {
            toastr.success(response.message)
        }, function (response) {
            toastr.error(response.message)
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


    $scope.getSessions = function () {
        UserService.getSessions().then(function (response) {
            $scope.user = response
            console.log(response);
            for (var i=0;i<response._sessionsJoined.length;i++){
                if (response._sessionsJoined._id == response._id){
                    response._sessionsJoined[i].isOwner = true;
                } else {
                    response._sessionsJoined[i].isOwner = false;
                }
            }
        })
    }



    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            UserService.changePassword(passwords.newPassword).then(function (response) {
                $scope.passwords = {};
            })
        } else {
            toastr.error("Passwords didn't match");
        }
    }
}]);
