// ---------- MAP ----------

var treatmap;

// Define base layer.
var stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain'
	// + 'background/{z}/{x}/{y}.{ext}', {
	+ '/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '
	+ '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '
	+ 'Map data &copy; ' 
	+ '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	ext: 'png'
});


// "Take" area from Chris Reese map

var block_layer={
    "type": "FeatureCollection",
    "name": "TestTake2",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": 1, "name": "takearea" }, "geometry": 
            { "type": "MultiPolygon", "coordinates": [ 
                [ [ [ -73.759880867025117, 42.653325121546722 ], [ -73.755741971078464, 42.650915714974225 ], [ -73.755582168146177, 42.651068509382384 ], [ -73.754111981168975, 42.650328040675475 ], [ -73.754799133777865, 42.649716853514605 ], [ -73.754879035244031, 42.649046891457878 ], [ -73.752034543049035, 42.64835341436023 ], [ -73.752338168620412, 42.647659929531223 ], [ -73.75152317366566, 42.647565897094772 ], [ -73.750468474312456, 42.64788325599811 ], [ -73.749701420237415, 42.645990832653489 ], [ -73.750564356071848, 42.644709594104555 ], [ -73.756477064567065, 42.646237673745922 ], [ -73.756860591604593, 42.645673464095424 ], [ -73.759896847318359, 42.646837140892657 ], [ -73.761542817521075, 42.645320830465288 ], [ -73.762517615408129, 42.645873288931874 ], [ -73.763620255641015, 42.647659929531223 ], [ -73.764579073234842, 42.647871501993521 ], [ -73.765250245550519, 42.648224121164894 ], [ -73.759880867025117, 42.653325121546722 ] ] ] 
                ] 
            } 
        }
    ]
}


var blockLayer = new L.GeoJSON(block_layer);
// var geojsonLayer = new L.GeoJSON.AJAX("Rivers.json"); 
// regular map setting
// ----- set map -----
treatmap = L.map('mapdiv', {
	center: [42.6503, -73.758], // -72.45
	zoom: 15, // 9
	layers: [stamen] // topobase stamen , siteMarkers hitchcock // , block_layer
});

// map._handlers.forEach(function(handler) {
//     handler.disable();
// });

treatmap.dragging.disable();
treatmap.touchZoom.disable();
treatmap.doubleClickZoom.disable();
treatmap.scrollWheelZoom.disable();
treatmap.boxZoom.disable();
treatmap.keyboard.disable();

function setPoint(lat, lon, zoomLevel, layerName) {
	// treatmap.setView([42.5, -72], 11) 
	treatmap.setView([lat, lon], zoomLevel);
	// treatmap.removeLayer(block_layer);
	if (layerName == 'take') {
		// treatmap.addLayer(block_layer);
		// L.geoJSON(block_layer).addTo(treatmap);
		blockLayer.addTo(treatmap);
	} else {
		if (treatmap.hasLayer(blockLayer)) {
			// console.log(" -- got to not-take");
			treatmap.removeLayer(blockLayer);
		}
	}
}


