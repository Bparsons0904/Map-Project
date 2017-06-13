var ViewModel = function() {
	var self = this;
	// Observalble array, will store available locations
	this.locationList = ko.observableArray([]);

	// Runs all locations and adds to locationList
	initialPlaces.forEach(function(places) {
		self.locationList.push(places);
	});

	// Observerable text input from DOM filter input
	this.filter = ko.observable("");

	// Filter through locationList, display markers and list that match input
	this.locationFilter = ko.computed(function() {
		var filter = String(self.filter()).toLowerCase();
		// If no filter input, make all visible
		if (!filter) {
			self.locationList().forEach(function(location) {
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
		$.ajax("https://api.foursquare.com/v2/venues/search?ll=" + location.latlng.lat + "," + location.latlng.lng + "&oauth_token=" + oauth + "&v=20170606").done(function(data) {
			var locationID = data.response.venues[0].id;
			// Use locationID to get specifics from location
			$.ajax("https://api.foursquare.com/v2/venues/" + locationID + "/?oauth_token=" + oauth + "&v=20170606").done(function(details) {
				// Sets variables from returned JSON
				var suffixString = details.response.venue.bestPhoto.suffix;
				var rating = details.response.venue.rating || "No rating available.";
				var ratingColor = details.response.venue.ratingColor || "000000";
				var visits = details.response.venue.stats.visitsCount || "Visit Count unavailable.";
				// Create HTML for view window
				var content = "";
				content += "<div class='info-window'><h2 class='info-name'>" + location.name + "</h2>";
				content += "<h3 class='info-address'>" + location.address + "</h3>";
				content += "<div class='foursquare'>";
				content += "<img class='view-image' src='" + "https://igx.4sqi.net/img/general/width200" + suffixString + "' alt='Image'>";
				content += "<div class='infobox'><h4 class='info-type'>" + location.type + "</h4>";
				content += "<div class='info-rating'><h4 class='info-rating'>Current Rating: </h4><h4 class='info-rating' style='color:#" + ratingColor + "'>" + rating + "</h4></div>";
				content += "<h4 class='infoVisits'>Registered Visits: " + visits + "</h4>";
				content += "</div></div>";
				infowindow.setContent(content);
				// If error from 2nd AJAX request, add content to view window
			}).fail(function() {
				var content = "";
				content += "<h1 class='info-name'>" + location.name + "</h1>";
				content += "<h2 class='info-address'>" + location.address + "</h2>";
				content += "<h2 class='info-type'>" + location.type + "</h2>";
				content += "<h4 class='error'>Unable to retrive additonal information from FourSquare<h4>";
				infowindow.setContent(content);
			});
			// If error from 1st AJAX request, add content to view window
		}).fail(function() {
			var content = "";
			content += "<h1 class='info-name'>" + location.name + "</h1>";
			content += "<h2 class='info-address'>" + location.address + "</h2>";
			content += "<h2 class='info-type'>" + location.type + "</h2>";
			content += "<h4 class='error'>Unable to retrive additonal information from FourSquare<h4>";
			infowindow.setContent(content);
		});
		// Set map settings, including center, zoom and pan
		map.setCenter(location.latlng);
		map.setZoom(17);
		map.panBy(0, -250);
		// Add marker animation for set time
		location.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			location.marker.setAnimation(null);
		}, 2100);
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
		center: {
			lat: 36.829047,
			lng: -76.124740
		},
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
	for (i = 0; i < locations.length; i++) {
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
	// Assign marker to location array
	newViewModel.locationList()[i].marker = marker;
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

// Alert for error when loading Google Maps.  Used exactly from MDN GlobalEventHandlers.onerror
window.onerror = function(msg, url, lineNo, columnNo, error) {
	var string = msg.toLowerCase();
	var substring = "script error";
	if (string.indexOf(substring) > -1) {
		alert('Script Error: See Browser Console for Detail');
	} else {
		var message = [
			'Message: ' + msg,
			'URL: ' + url,
			'Line: ' + lineNo,
			'Column: ' + columnNo,
			'Error object: ' + JSON.stringify(error)
		].join(' - ');
		alert(message);
	}
	return false;
};

// Set the width of the side navigation to 250px from W3School
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

// Set the width of the side navigation to 0 from W3School
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}
