// Initialize the map variables!

var map;
// A variable to set whether the map is loaded
var isMapsApiLoaded = false;
// Create a blank array for all the markers of the places I have chosen.
var googleMarkers = [];
// Create a populate marker variable
var populateInfoWindow;
// Keep track of the open InfoWindow
var openInfoWindow;
// Keep track of the created icons
var defaultIcon;
var highlightedIcon;

// Initialize a map!
function initMap() {

  isMapsApiLoaded = true;

  // Style from Snazzy Maps: Retro, by Adam Krogh
  var styles = [
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#84afa3"
            },
            {
                "lightness": 52
            }
        ]
    },
    {
        "stylers": [
            {
                "saturation": -17
            },
            {
                "gamma": 0.36
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3f518c"
            }
        ]
    }
  ];

  // Constructor to create a new map. Centering near my neighborhood in Bayview.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.000828, lng: -87.902507},
    zoom: 15,
    styles: styles,
  });

  // The below is taken from the Udacity Google Maps API course

  // Initialize the largeInfoWindow variable
  var largeInfowindow = new google.maps.InfoWindow();

  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  // Style the markers a bit. This will be our listing marker icon.
  defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  highlightedIcon = makeMarkerIcon('FF0000');

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < appViewModel.markers.length; i++) {
    // Get the position from the location array.
    var position = new google.maps.LatLng(appViewModel.markers[i].lat,appViewModel.markers[i].lng);
    var title = appViewModel.markers[i].title;
    var description = appViewModel.markers[i].description;
    var fsquare = appViewModel.markers[i].fsquare;

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      description: description,
      fsquare: fsquare,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Push the marker to our array of markers.
    googleMarkers.push(marker);
    //Rewrite the initial array with our googleMarkers so that they have the visible property.
    appViewModel.markers[i].marker=marker;

    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

    marker.setMap(map);
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  populateInfoWindow = function(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      // If it is, close it.
      if (openInfoWindow != null){
        openInfoWindow.close();
      }

      // Clear the infowindow content to give the foursquare time to load.
      infowindow.setContent('');
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });

      // Form the URL required for the AJAX request. We're getting pictures from Foursquare.
      var fsquareSource = 'https://api.foursquare.com/v2/venues/' + marker.fsquare + '/photos?client_id=EFOB21RL3IRCA2NW1JHNZ2RUXDRYD0WLCYRJDEMXB1CYQTH2&client_secret=0IPY5UHRRGZV2IGVDCDJ0ZRAIXFVDCOW0F12AINYEHID0QAS&v=20170702';
      // The AJAX request for the Foursquare API
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: fsquareSource
      }).done(function(data) {
        // If we got a response, deconstruct it and give credit to the photographer.
        var photoURL = data.response.photos.items[0].prefix + '150x150' + data.response.photos.items[0].suffix;
        var photographer = data.response.photos.items[0].user.firstName + ' ' + data.response.photos.items[0].user.lastName;
        infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + marker.description +
         '<div class="infoWindow"><img src=' + photoURL + ' alt=' + marker.title + '> Photo by: ' + photographer + '</div>');
      }).fail(function(){
        alert("There was an error with the Foursquare API! Please try again.");
        infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + marker.description + '<div>No FourSquare pictures found!</div>');
      });

      // Open the infowindow on the correct marker.
      openInfoWindow = infowindow;
      infowindow.open(map, marker);
      // Highlight the marker for half a second.
      marker.setIcon(highlightedIcon);
      setTimeout(function(){
        marker.setIcon(defaultIcon);
      }, 500);
    }
  };

}

mapError = function() {
  appViewModel.mapError(true);
};