/**
 * Created by imitrach on 9/22/2016.
 */
var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', [ '$scope', 'userService', 'geolocation', '$log', 'gservice', function($scope, userService, geolocation, $log, gservice) {
    //init var
    $scope.formData = {};
    var coords      = {};
    var lat         = 0;
    var long        = 0;


    //Set initial coordinates to Summer Time XD
    $scope.formData.latitude = 44.256375;
    $scope.formData.longitude =  28.619910;


    $scope.createUser = function(){

        //Grabs input data
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        userService.registerNewUser('/users', userData).success(function(data){

            $scope.formData.username = "";
            $scope.formData.gender = "";
            $scope.formData.age = "";
            $scope.formData.favalang = "";

            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            $log.info(data);

        }).error(function(data){
            $log.error(data);
        })



    }



}]);