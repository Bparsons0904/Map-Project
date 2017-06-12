// Initial array of places to display
var initialPlaces = [
  {
    name : "USS Wisconsin BB-64",
    address : "1 Waterside Dr, Norfolk, VA 23510",
    type : "Museum",
    latlng : {
      lat : 36.847681,
      lng : -76.295287,
      },
    }, {
    name : "The NorVa",
    address : "317 Monticello Ave, Norfolk, VA 23510",
    type : "Attraction",
    latlng : {
      lat : 36.850254,
      lng : -76.289670
      },
    }, {
    name : "Harbor Park Stadium",
    address : "150 Park Ave, Norfolk, VA 23510",
    type : "Attraction",
    latlng : {
      lat : 36.842657,
      lng : -76.278038
      },
    }, {
    name : "Virginia Aquarium & Marine Science Center",
    address : "717 General Booth Blvd, Virginia Beach, VA 23451",
    type : "Attraction",
    latlng : {
      lat : 36.821113,
      lng : -75.983551
      },
    }, {
    name : "Adventure Parasail",
    address : "300 Winston Salem Ave, Virginia Beach, VA 23451",
    type : "Attraction",
    latlng : {
      lat : 36.832082,
      lng : -75.974112
      },
    }, {
    name : "Tautog's Restaurant",
    address : "205 23rd St, Virginia Beach, VA 23451",
    type : "Restaurant",
    latlng : {
      lat : 36.851296,
      lng : -75.976501
      },
    }, {
    name : "Virginia Zoological Park",
    address : "3500 Granby St, Norfolk, VA 23504",
    type : "Attraction",
    latlng : {
      lat : 36.8768152,
      lng : -76.2769915
      },
    }, {
    name : "Mount Trashmore Park",
    address : "310 Edwin Dr, Virginia Beach, VA 23462",
    type : "Attraction",
    latlng : {
      lat : 36.829047,
      lng : -76.124740
      },
    }, {
    name : "Virginia Beach Fishing Pier",
    address : "1413 Atlantic Ave, Virginia Beach, VA 23451",
    type : "Attraction",
    latlng : {
      lat : 36.843613,
      lng : -75.970959
      },
    }, {
    name : "Mahi Mah's Seafood",
    address : "615 Atlantic Avenue, Virginia Beach, VA 23451",
    type : "Restaurant",
    latlng : {
      lat : 36.835315,
      lng : -75.970998
      },
    }];


var ViewModel = function() {
  var self = this;

// Observalble array, will store available locations
  this.locationList = ko.observableArray([]);

// Runs all locations and adds to locationList
  initialPlaces.forEach(function(places){
    self.locationList.push(places);
  });
  
// Observerable text input from DOM filter input
  this.filter = ko.observable("");

// Filter through locationList, display markers and list that match input
  this.locationFilter = ko.computed(function() {
      var filter = String(self.filter()).toLowerCase();
      // If no filter input, make all visible
      if (!filter) {
          self.locationList().forEach(function(location){
            if (location.marker) {
                location.marker.setVisible(true);
            }
          });
          return self.locationList();
      } else {
        // If match from filter found, make visible
          return ko.utils.arrayFilter(self.locationList(), function(location) {
              var match = String(location.name).toLowerCase().indexOf(filter) !== -1;
              location.marker.setVisible(match);
              return match;
          });
      }
  });

// Function that is started based on click event
  this.markerSelected = function(location) {
    var oauth = "IQ0J14AEG4RQ2GJHIZMQ54OKSOVV3C5ZQKTHAT44M2WKQ3DB";
    // Grab lat and Lng from array, submit to FourSquare to aquire location ID
    $.ajax("https://api.foursquare.com/v2/venues/search?ll=" + location.latlng.lat + "," + location.latlng.lng + "&oauth_token=" + oauth + "&v=20170606"
       ).done(function(data) {
        var locationID = data.response.venues[0].id;
    // Use locationID to get specifics from location
    $.ajax("https://api.foursquare.com/v2/venues/" + locationID + "/?oauth_token=" + oauth + "&v=20170606"
      ).done(function(details) {
        // Sets variables from returned JSON
        var suffixString = details.response.venue.bestPhoto.suffix;
        var rating = details.response.venue.rating;
        var ratingColor = details.response.venue.ratingColor;
        var visits = details.response.venue.stats.visitsCount;
        // Create HTML for view window
        var content = "";
        content += "<div class='infoWindo'><h2 class='infoName'>" + location.name + "</h2>";
        content += "<h3 class='infoAddress'>" + location.address + "</h3>";
        content += "<div class='fourSquare'>";
        content += "<img class='viewImage' src='" + "https://igx.4sqi.net/img/general/width200" + suffixString + "' alt='Image'>";
        content += "<div class='infoRight'><h4 class='infoType'>" + location.type + "</h4>";
        content += "<div class='infoRating'><h4 class='infoRating'>Current Rating: </h4><h4 class='infoRating' style='color:#" + ratingColor + "'>" + rating + "</h4></div>";
        content += "<h4 class='infoVisits'>Registered Visits: " + visits + "</h4>";
        content += "</div></div>";
        infowindow.setContent(content);
      // If error from 2nd AJAX request, add content to view window
      }).fail(function() {
        var content = "";
        content += "<h1 class='infoName'>" + location.name + "</h1>";
        content += "<h2 class='infoAddress'>" + location.address + "</h2>";
        content += "<h2 class='infoType'>" + location.type + "</h2>";
        content += "<h4 class='error'>Unable to retrive additonal information from FourSquare<h4>";
        infowindow.setContent(content);
      });
    // If error from 1st AJAX request, add content to view window
    }).fail(function() {
      var content = "";
      content += "<h1 class='infoName'>" + location.name + "</h1>";
      content += "<h2 class='infoAddress'>" + location.address + "</h2>";
      content += "<h2 class='infoType'>" + location.type + "</h2>";
      content += "<h4 class='error'>Unable to retrive additonal information from FourSquare<h4>";
      infowindow.setContent(content);
    });
    // Set map settings, including center, zoom and pan
    map.setCenter(location.latlng);
    map.setZoom(17);
    map.panBy(0,-250);
    // Add marker animation for set time
    location.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        location.marker.setAnimation(null);
    }, 3000);
    // close nav window if open
    closeNav();
    // open maps info window
    infowindow.open(map, location.marker);
  };
}; // ViewModel closing brace

// Generate map
function initMap() {
  // Call to generate map from google.
  map = new google.maps.Map(document.getElementById("map"), {
    // Optional settings for map
    zoom: 10,
    center: {lat : 36.829047, lng : -76.124740},
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: google.maps.ControlPosition.LEFT_BOTTOM
    },
  });
    // Initialize Informaiton Window
    infowindow = new google.maps.InfoWindow();
    var locations = newViewModel.locationFilter();
    // Go through each location from filter and create map marker
    console.log("got to marker");
    for (i = 0; i <locations.length; i++){
      createMarker(i).setMap(map);
  }
}

    function createMarker(i) {
      var locations = newViewModel.locationFilter();
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].latlng),
        map: map,
        title: String(locations[i].name),
      });
      console.log(marker);
      // Assign marker to location array
      newViewModel.locationList()[i].marker = marker;
      console.log(newViewModel.locationList()[i]);
      // Create a event listener for each marker
      google.maps.event.addListener(marker, "click", (function(location) {
        return function() {
          // Run markerselected when marker is selected
          newViewModel.markerSelected(location);
        };
      })(locations[i]));
      return marker;
    }


var newViewModel = new ViewModel();
ko.applyBindings(new ViewModel());


// Set the width of the side navigation to 250px from W3School
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

// Set the width of the side navigation to 0 from W3School
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
