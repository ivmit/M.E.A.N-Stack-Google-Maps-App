/**
 * Created by imitrach on 9/22/2016.
 */
app.factory('gservice',['$http','$log', function($http, $log) {
    var locations = []; //locations obtained from API call
    var selectedLat = 44.256375; //initialize to summer time XD
    var selectedLong = 28.619910;

    function refresh(latitude, longitude){

        locations = [];
        selectedLat = latitude;
        selectedLong = longitude;

        $http.get('/users').success(function(response){

            locations = convertToMapPoints(response);
            debugger;
            init(latitude, longitude, locations);

        }).error(function(err) {
            if(err) $log.error(err);
        });


    }

    function convertToMapPoints(response){

        var convertedLocations = [];

        response.forEach(function(user, index){
            var contentString = '<p><strong>Username</strong>: ' + user.username +
                    '<br><strong>Age</strong>: ' + user.age +
                    '<br><strong>Gender</strong>: ' + user.gender +
                    '<br><strong>Favorite Language</strong>: ' + user.favlang +
                    '</p>';

            convertedLocations.push({
                latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                message: new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 320
                }),
                username: user.username,
                gender: user.gender,
                age: user.age,
                favlang: user.favlang
            });

        });

        return convertedLocations;

    }

    function init(latitude, longitude, locations){

        var myLatLng = {lat: selectedLat, lng: selectedLong};

        if(!map){
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: myLatLng
            });
        }

        if(locations){
            //place a marker forEach location
            locations.forEach(function(location, i){
                var marker = new google.maps.Marker({
                    position: location.latlon,
                    map: map,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });

                //For each marker created, add a listener that check for clicks

                google.maps.event.addListener(marker, 'click', function(e){
                    currentSelectedMarker = location;
                    location.message.open(map, marker);
                });

            });

            var initialLocation = new google.maps.LatLng(latitude + latitude/1000, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });


            lastmarker = marker;
        }


    }


    google.maps.event.addDomListener(window, 'load',
       refresh(selectedLat, selectedLong));


    return {
        refresh: refresh
    }

}]);