// The view model.

// marker class is where all of the marker variables are stored
var Marker = function(title,description,lat,lng,fsquare){
  var self = this;
  this.title = title;
  this.description = description;
  this.lat = lat;
  this.lng = lng;
  this.fsquare = fsquare;
};

var appViewModel = {

  // The included restaurants to have markers
  markers: [
    new Marker("Cafe India","An excellent place for Indian food. My favorite.",43.004400,-87.905661,"54303fdf498e9bcafb319f80"),
    new Marker("LuLu Cafe","A decent place for sandwiches. It does not live up to the hype.",43.003370,-87.904936,"4ad7507cf964a5206d0921e3"),
    new Marker("Odd Duck","A vegetarian-friendly tapas place. I'm looking forward to going soon!",43.001990,-87.903207,"4f844dffe4b0f4019e65d7f8"),
    new Marker("Honeypie","A restaurant and bakery. My gluten-free friend says it's her favorite!",42.996787,-87.898616,"4ad61aa9f964a520180521e3"),
    new Marker("Sven's Cafe","A great place for sandwiches. Better than LuLu.",42.995846,-87.897095,"4a70672af964a52068d71fe3"),
  ],

  //Observable for performing the filter
  searchQuery: ko.observable(''),

  // Observable for toggling the menu, default is false since the menu is hidden
  toggleMenu: ko.observable(false),
  toggleMenuText: ko.observable("Show Menu"),

  // Observable to alert for a map error
  mapError : ko.observable(false),

  openMarkerInfoWindow : function() {
    //set up a dummy infoWindow so that we can pass it in.
    var infoWindow = new google.maps.InfoWindow();
    populateInfoWindow(this.marker, infoWindow);
  },


  // Change the toggleMenu and toggleMenuText observables every time the
  // menu button is clicked.
  toggleMenuF: function() {

    appViewModel.toggleMenu(!appViewModel.toggleMenu());

    // If the toggleMenu observable is false,
    // have the menu read "Show Menu", otherwise, read "Hide Menu"
    if (appViewModel.toggleMenu()) {
      appViewModel.toggleMenuText("Hide Menu");
    } else {
      appViewModel.toggleMenuText("Show Menu");
    }
  },

};

// The search function using the observable array and searchQuery above
appViewModel.search = ko.computed(function() {
  var self = this;
  // Convert the search query to lower case to better compare it
  var search = this.searchQuery().toLowerCase();
  return ko.utils.arrayFilter(self.markers, function(googleMarkers) {
    // Convert each marker title to lower case
    var title = googleMarkers.title.toLowerCase();
    // Do the compare. If the search string matches any bit of the marker title, it is a match.
    var matched = title.indexOf(search) >= 0;
    // Set our marker to the corresponding googleMarker.
    var marker = googleMarkers.marker;
    // If the marker is in the matched list, make it visible.
    if (marker) {
      marker.setVisible(matched);
    }
    return googleMarkers.title.toLowerCase().indexOf(search) >=0;
  });
}, appViewModel);

// Activates knockout.js
ko.applyBindings(appViewModel);