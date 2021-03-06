var locations = [
    ['Mysuru,in', 12.2958, 76.6394, 9],
    ['Indore,in', 22.7196, 75.8577, 8],
    ['Rajkot,in', 22.3039, 70.8022, 7],
    ['Kanpur,in', 26.4499, 80.3319, 6],
    ['Bikaner,in', 28.0229, 73.3119, 5],
    ['Sawai Madhopur,in', 26.0378, 76.3522, 4],
    ['Delhi,in', 28.7041, 77.1025, 3],
    ['Jaisalmer,in', 26.9157, 70.9083, 2],
    ['Udaipur,in', 24.5854, 73.7125, 1]
    ];
    var marker =[];
    var infoWindow;
    var currentlat,currentlng;
    var currentpos,destination;
    function initMap(){
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var bounds = new google.maps.LatLngBounds;
      var service = new google.maps.DistanceMatrixService;
      var geocoder = new google.maps.Geocoder;
      var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 5,
        center:{lat : 20.5937,lng: 78.9629}
      })
      directionsDisplay.setMap(map);
      infoWindow = new google.maps.InfoWindow;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var pos ={
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          currentlat=position.coords.latitude;
          currentlng=position.coords.longitude;
          currentpos=currentlat+","+currentlng;
          infoWindow.setPosition(pos);
          infoWindow.setContent("Current Position");
          infoWindow.open(map);
          map.setCenter(pos);
        },function(){
          handleLocationError(true,infoWindow,map.getCenter());
        });
      }
      for(j=0;j<10;j++){
        marker[j] = new google.maps.Marker({
          position:{lat:locations[j][1],lng:locations[j][2]},
          title:locations[j][0]
        });
        marker[j].setMap(map);
        marker[j].addListener('click',function(){
          console.log("click kiya");
          destination=this.title;
          map.setZoom(9);
          calculateAndDisplayDirection(directionsService,directionsDisplay);
        });
      }
    }
    function calculateAndDisplayDirection(directionsService, directionsDisplay) {
        directionsService.route({
          origin: currentpos,
          destination: destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            console.log(response);
            var legs = response.routes[0].legs;
            for (var i=0;i<legs.length;i++){
               document.getElementById('output').innerHTML = "<h4>Estimated time of arrival is: </h4>" + legs[i].duration.text;
            }       
            directionsDisplay.setDirections(response);
                      } else {
            window.alert('Directions request failed due to ' + status);
          }
      });
    }