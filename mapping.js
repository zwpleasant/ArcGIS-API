require([
  "esri/map",
  "esri/dijit/Search",
  "esri/geometry/Extent",
  "esri/graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/geometry/screenUtils",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/Color",
  "dojo/domReady!"
], function(Map, Search, Extent, Graphic, SimpleMarkerSymbol, screenUtils, dom, domConstruct, query, Color) {
  // create a map and instance of the geocoder widget here
  var map = new Map("map", {
    basemap: "national-geographic",
    center: [-122.45, 37.75],
    zoom: 13
  });

   var search = new Search({
      map: map
   }, dom.byId("search"));

   //Create extent to limit search
   var extent = new Extent({
      "spatialReference": {
         "wkid": 102100
      },
      "xmin": -13063280,
      "xmax": -13033928,
      "ymin": 4028345,
      "ymax": 4042715
   });

   // set the source's searchExtent to the extent specified above
   search.sources[0].searchExtent = extent;

   // make sure to start up the widget!
   search.startup();

});

// stopped at step 7 (need to create a Spotlight Effect!)
