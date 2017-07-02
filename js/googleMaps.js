// Initialize the map variables!

var map;
// A variable to set whether the map is loaded
var isMapsApiLoaded = false;
// Create a blank array for all the markers of the places I love or loved.
var markers = [];

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
      center: {lat: 43.000026, lng: -90.137980},
      zoom: 13,
      styles: styles,
    });

  }