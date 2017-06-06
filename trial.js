
var initialPlaces = [
  {
    name : 'USS Wisconsin BB-64',
    address : '1 Waterside Dr, Norfolk, VA 23510',
    lat : '36.847681',
    lng : '-76.295287',
  },
  {
    name : "The NorVa",
    address : '317 Monticello Ave, Norfolk, VA 23510',
    lat : '36.850254',
    lng : '-76.289670',
  },
  {
    name : "Harbor Park Stadium",
    address : '150 Park Ave, Norfolk, VA 23510',
    lat : '36.842657',
    lng : '-76.278038',
  },
  {
    name : "Virginia Aquarium & Marine Science Center",
    address : '717 General Booth Blvd, Virginia Beach, VA 23451',
    lat : '36.821113',
    lng : '-75.983551',
  },
  {
    name : "Adventure Parasail",
    address : '300 Winston Salem Ave, Virginia Beach, VA 23451',
    lat : '36.832082',
    lng : '-75.974112',
  },
  {
    name : "Tautog's Restaurant",
    address : '205 23rd St, Virginia Beach, VA 23451',
    lat : '36.851296',
    lng : '-75.976501',
  },
  {
    name : "Virginia Zoological Park",
    address : '3500 Granby St, Norfolk, VA 23504',
    lat : '36.878735',
    lng : '-76.279918',
  },
  {
    name : "Mount Trashmore Park",
    address : '310 Edwin Dr, Virginia Beach, VA 23462',
    lat : '36.829047',
    lng : '-76.124740',
  },
  {
    name : "Virginia Beach Fishing Pier",
    address : '1413 Atlantic Ave, Virginia Beach, VA 23451',
    lat : '36.843613',
    lng : '-75.970959',
  },
  {
    name : "Mahi Mah's Seafood",
    address : '615 Atlantic Avenue, Virginia Beach, VA 23451',
    lat : '36.835315',
    lng : '-75.970998',
  },
];



var PlaceInformation = function(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);

};



var ViewModel = function() {
  var self = this;


  self.currentPlace = ko.observable();

  self.categoryList = [];

  initialPlaces.map( location => {
      if ( !self.categoryList.includes( location.category ) ) {
          self.categoryList.push( location.category );
      }
  } );

  self.locationsArray = ko.observableArray( initialPlaces );




  this.locationList = ko.observableArray([]);

  initialPlaces.forEach(function(places){
    self.locationList.push( new PlaceInformation(places) );
  });

  this.currentPlace = ko.observable( this.locationList()[0] );

  this.setPlace = function(clickedPlace) {
    self.currentPlace(clickedPlace)
  };


};





// Function to initialize the map within the map div
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
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
  markers( ViewModel.locationsArray() );
};

function markers(locations) {
    for (i = 0; i <locations.length; i++){
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map,
      animation: google.maps.Animation.DROP,
      title: locations[i].name,
      id: i
      });
      google.maps.event.addListener(marker, 'click', (function(location) {
        return function() {

          map.setZoom(14);
        };
      })(locations[i]));
    };
};




ko.applyBindings( new ViewModel());
















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