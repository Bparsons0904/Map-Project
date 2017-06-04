var locations = [
  {
    name : 'Swagat',
    address : '',
  },
  {
    name : "Kato's",
    address : '',
  },
];



var Map = function() {


};



var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);


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


};

ko.applyBindings(new ViewModel());



// Function to initialize the map within the map div
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 36.829451, lng: -76.147590},
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
  var singleLatLng = {lat: 36.829451, lng: -76.147590};
  // TODO: Create a single marker appearing on initialize -
  // Create it with the position of the singleLatLng,
  // on the map, and give it your own title!
  var marker = new google.maps.Marker({
    position: singleLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Hello World!'
  });
}





















/*
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
