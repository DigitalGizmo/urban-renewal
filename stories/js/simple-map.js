// ---------- MAP ----------

// Define base layer.
const stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain'
	// + 'background/{z}/{x}/{y}.{ext}', {
	+ '/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '
	+ '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '
	+ 'Map data &copy; ' 
	+ '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	ext: 'png'
});

// ----- define historic overlay ----- 
const sanborn   = L.tileLayer('tiles/sanborn/{z}/{x}/{y}.png', {
	attribution: 'Sanborn map',
	// bounds: mybounds, //tempbounds
	minZoom: 15,
	maxZoom: 16,
	//opacity: .7,
    tms: true
})

// "Take" area from Chris Reese map
const block_layer={
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
const blockLayer = new L.GeoJSON(block_layer);

const district_state = {
	"type": "FeatureCollection",
	"name": "district-state",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
	{ "type": "Feature", "properties": { "id": 1, "name": "State" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ -73.75989884186076, 42.653339402122143 ], [ -73.756649332285008, 42.651490128484717 ], [ -73.75739290810391, 42.650785835002196 ], [ -73.760639169552576, 42.652645445105343 ], [ -73.75989884186076, 42.653339402122143 ] ] ] ] } }
	]
}
const districtState = new L.GeoJSON(district_state);

const district_boarding = {
	"type": "FeatureCollection",
	"name": "district-boarding",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
	{ "type": "Feature", "properties": { "id": 2, "name": "Boarding" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ -73.76072145296024, 42.652553080127312 ], [ -73.75653817493945, 42.650180965685465 ], [ -73.757646647226053, 42.649121826627415 ], [ -73.761762453020722, 42.651539320385709 ], [ -73.76072145296024, 42.652553080127312 ] ] ] ] } },
	{ "type": "Feature", "properties": { "id": 2, "name": "Boarding South" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ -73.762263675272052, 42.651064336360569 ], [ -73.758106260264128, 42.648689179463155 ], [ -73.75884186951771, 42.647980396627027 ], [ -73.762976953091268, 42.65039084533084 ], [ -73.762263675272052, 42.651064336360569 ] ] ] ] } }
	]
}
const districtBoarding = new L.GeoJSON(district_boarding);

const districts = [districtState, districtBoarding];

// ----- set map -----
// regular map setting
const urmap = L.map('mapdiv', {
	center: [42.6503, -73.76], // -72.45
	zoom: 15, // 9
	layers: [stamen] // topobase stamen , siteMarkers hitchcock // , block_layer
});

// map._handlers.forEach(function(handler) {
//     handler.disable();
// });

urmap.dragging.disable();
urmap.touchZoom.disable();
urmap.doubleClickZoom.disable();
urmap.scrollWheelZoom.disable();
urmap.boxZoom.disable();
urmap.keyboard.disable();


function addSanborn() {
	if (!urmap.hasLayer(sanborn)) {
		urmap.addLayer(sanborn);
	}
	// Since State was first on it will be last to leave in reverse
	if (urmap.hasLayer(districtState)) {
		urmap.removeLayer(districtState);
	}
}

function removeSanborn() {
	if (urmap.hasLayer(sanborn)) {
		urmap.removeLayer(sanborn);
	}
}

function setPoint(lat, lon, zoomLevel) {
	urmap.setView([lat, lon], zoomLevel);
}

function showDistrict(lat, lon, zoomLevel, districtId) {
	setPoint(lat, lon, zoomLevel) ;
	// Because we can only get to this sequentially we (should)
	// know that it's not already present
	districts[districtId].addTo(urmap);
	// remove any other districts
	for (let i = 0; i < districts.length; i++) {
		if (i != districtId) { // don't delete the one we just added!			
			if (urmap.hasLayer(districts[i])) {
				// console.log(" -- got to not-take");
				urmap.removeLayer(districts[i]);
			}
		}
	}
}

function showState(lat, lon, zoomLevel, layerName) {
	setPoint(lat, lon, zoomLevel) ;
	// urmap.removeLayer(block_layer);
	if (layerName == 'take') {
		// urmap.addLayer(block_layer);
		// L.geoJSON(block_layer).addTo(urmap);
		districtState.addTo(urmap);
	} else {
		if (urmap.hasLayer(districtState)) {
			// console.log(" -- got to not-take");
			urmap.removeLayer(districtState);
		}
	}
}


