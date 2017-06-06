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
      lat : 36.878735,
      lng : -76.279918
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
  this.visible = ko.observable( true );
};


var ViewModel = function() {
  var self = this;


  self.selectedCategory = ko.observable();

  this.newPlace = ko.observable();



  this.locationList = ko.observableArray(initialPlaces);

  initialPlaces.forEach(function(places){
    self.locationList.push( new PlaceInformation(places) );
  });

  this.currentPlace = ko.observable( );

  this.markerSelected = function(location) {
    map.setCenter(location.latlng);
    map.setZoom(17);
    self.currentPlace(location);
  };

};


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 36.829047, lng: -76.124740},
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
    markers( newViewModel.locationList() );
}


function markers(locations) {
  for (i = 0; i <locations.length; i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].latlng),
      map: map,
      animation: google.maps.Animation.DROP,
      title: String(locations[i].name),
    });
    google.maps.event.addListener(marker, 'click', (function(location) {
      return function() {
        newViewModel.markerSelected(location);
      };
    })(locations[i]));
  };
};

var newViewModel = new ViewModel();
ko.applyBindings( new ViewModel() );
















/*

for (var i = 0; i < locations.length; i++) {
    var place = locations[i].name;
    var elem = document.createElement('a');
    elem.setAttribute('class', 'places_menu')
    elem.textContent = (place);
    elem.addEventListener('click', (function(placeCopy) {
        return function() {
            console.log(placeCopy);
            selectMarker(placeCopy);
        };
    })(place));

    $('#mySidenav').append(elem);
};


var availableCats = ['popliner', 'chewie', 'daniel', 'betsy', 'oscar'];
var catCounts= [0, 0, 0, 0, 0]
var currentCat = availableCats[0];

function findPosition(catName) {
  var result = availableCats.indexOf(catName);
  console.log("findPosition" + result);
  return result
};


function catClick() {
  var position = findPosition(currentCat)
  catCounts[position] += 1;
  console.log("catClick Started");
  $clickCount.empty();
  $clickCount.append(catCounts[position]);
};


function capName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

function setCat(newCat) {
  currentCat = newCat;
  var position = findPosition(currentCat)
  $("#image").attr("src", "images/" + currentCat + ".jpg");
  $name.text(capName(currentCat));
  $clickCount.empty();
  $clickCount.append(catCounts[position]);
};

//$("#image").attr("src", "images/" + currentCat + ".jpg");
//$name.text(capName(currentCat));


//$('#image').click(catClick);


/*for (var i = 0; i < availableCats.length; i++) {
    var cat = availableCats[i];
    var elem = document.createElement('a');
    elem.setAttribute('class', 'cat_menu')
    elem.textContent = capName(cat);
    elem.addEventListener('click', (function(catCopy) {
        return function() {
            console.log(catCopy);
            setCat(catCopy);
        };
    })(cat));

    $('#mySidenav').append(elem);
};
*/












/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
