map_project

Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

Highlighted locations
3rd Party Data about those locations
Various Ways to browse content

Include a filter
List View
Clicking location - Display Unique Information and creates map animation

Map displays all locations
Clicking marker opens infoWindow or DOM
Markers animate when clicked

AJAX Error handling
