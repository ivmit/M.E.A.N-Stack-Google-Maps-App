/**
 * Created by imitrach on 9/23/2016.
 */
app.service('userService', [ '$http', function($http){

    this.registerNewUser = function(endpoint, data) {

        return $http.post(endpoint, data);

    };





}]);