var initialPlaces = [
  {
    name : 'USS Wisconsin BB-64',
    address : '1 Waterside Dr, Norfolk, VA 23510',
    type : 'Museum',
    latlng : {
      lat : 36.847681,
      lng : -76.295287
    },
  }, {
    name : "The NorVa",
    address : '317 Monticello Ave, Norfolk, VA 23510',
    type : 'Attraction',
    latlng : {
      lat : 36.850254,
      lng : -76.289670
    },
  }, {
    name : "Harbor Park Stadium",
    address : '150 Park Ave, Norfolk, VA 23510',
    type : 'Attraction',
    latlng : {
      lat : 36.842657,
      lng : -76.278038
    },
  }, {
    name : "Virginia Aquarium & Marine Science Center",
    address : '717 General Booth Blvd, Virginia Beach, VA 23451',
    type : 'Attraction',
    latlng : {
      lat : 36.821113,
      lng : -75.983551
  },
}, {
    name : "Adventure Parasail",
    address : '300 Winston Salem Ave, Virginia Beach, VA 23451',
    type : 'Attraction',
    latlng : {
      lat : 36.832082,
      lng : -75.974112
  },
}, {
    name : "Tautog's Restaurant",
    address : '205 23rd St, Virginia Beach, VA 23451',
    type : 'Restaurant',
    latlng : {
      lat : 36.851296,
      lng : -75.976501
  },
}, {
    name : "Virginia Zoological Park",
    address : '3500 Granby St, Norfolk, VA 23504',
    type : 'Attraction',
    latlng : {
      lat : 36.8768152,
      lng : -76.2769915
  },
}, {
    name : "Mount Trashmore Park",
    address : '310 Edwin Dr, Virginia Beach, VA 23462',
    type : 'Attraction',
    latlng : {
      lat : 36.829047,
      lng : -76.124740
  },
}, {
    name : "Virginia Beach Fishing Pier",
    address : '1413 Atlantic Ave, Virginia Beach, VA 23451',
    type : 'Attraction',
    latlng : {
      lat : 36.843613,
      lng : -75.970959
  },
}, {
    name : "Mahi Mah's Seafood",
    address : '615 Atlantic Avenue, Virginia Beach, VA 23451',
    type : 'Restaurant',
    latlng : {
      lat : 36.835315,
      lng : -75.970998
  },
}];



var PlaceInformation = function(data) {
  this.name = ko.observable(data.name);
  this.latlng = ko.observable(data.latlng);
  this.type = ko.observable(data.type);
};


var ViewModel = function() {
  var self = this;

  this.newPlace = ko.observable();

  this.locationList = ko.observableArray(initialPlaces);

  initialPlaces.forEach(function(places){
    self.locationList.push( new PlaceInformation(places) );
  });

  this.currentPlace = ko.observable();

  self.photoSuffix = ko.observable();
  self.photoBase = ko.observable('https://igx.4sqi.net/img/general/width200');

  self.imgSrc = ko.computed(function() {
    return self.photoBase() + self.photoSuffix();
  });

  this.infoWindowContent = function(location) {
/*    newViewModel.imgSrc = ko.observable("<img class='viewImage' src='https://igx.4sqi.net/img/general/width200" + newViewModel.photoSuffix() + "' alt='Image' data-bind=(attr: {src: imgSrc})>"); */
    var content = "";
    content += "<h1 class='infoh1'>" + location.name + "</h1>";
    content += "<h2>" + location.address + "</h2>";
    content += "<h2>" + location.type + "</h2>";
    content += "<img class='viewImage' src='images/placehold.png' alt='Image' data-bind=(attr: {src: imgSrc})>";
    return content

  };



  this.foursquare = function(location) {
    var oauth = "IQ0J14AEG4RQ2GJHIZMQ54OKSOVV3C5ZQKTHAT44M2WKQ3DB"
    $.ajax("https://api.foursquare.com/v2/venues/search?ll=" + location.latlng.lat + "," + location.latlng.lng + "&oauth_token=" + oauth + "&v=20170606",
  ).done(function(data) {
        var venue = data.response.venues[0];
        location.id = ko.observable(venue.id);
    $.ajax("https://api.foursquare.com/v2/venues/" + location.id() + "/?oauth_token=" + oauth + "&v=20170606",
      ).done(function(details) {
        var suffix = details.response.venue.bestPhoto.suffix;
        newViewModel.photoSuffix = suffix;
      });
    });
  };

  this.markerSelected = function(location) {
    var venue_id;
    map.setCenter(location.latlng);
    map.setZoom(17);
    map.panBy(0,-200);
    self.currentPlace(location);
    location.marker.setAnimation(google.maps.Animation.BOUNCE);
    closeNav()
    newViewModel.foursquare(location);
    infowindow.setContent(newViewModel.infoWindowContent(location));
    infowindow.open(map, location.marker);


  };/*markerSelected closing brace */


}; /*ViewModel closing brace */


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat : 36.829047, lng : -76.124740},
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
  });
    infowindow = new google.maps.InfoWindow();
    markers( newViewModel.locationList() );
};


function markers(locations) {
  for (i = 0; i <locations.length; i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].latlng),
      map: map,
      title: String(locations[i].name),
    });
    newViewModel.locationList()[i].marker = marker;
    google.maps.event.addListener(marker, 'click', (function(location) {
      return function() {
        newViewModel.markerSelected(location);
      };
    })(locations[i]));
  };
};

var newViewModel = new ViewModel();
ko.applyBindings(new ViewModel());


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
