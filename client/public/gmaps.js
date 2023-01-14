let map, infoWindow;

function initMap() {

    
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const pos = { 
        lat: parseFloat(searchParams.get('lat')) , 
        lng: parseFloat(searchParams.get('lng')) 
        };    
    
  map = new google.maps.Map(document.getElementById("map"), {
    
  
    center: pos,
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
            
                              
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

