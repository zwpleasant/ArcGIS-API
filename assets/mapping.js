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
    basemap: "topo",
    center: [-117.19, 34.055],
    zoom: 15
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

   //set the source's searchExtent to the extent specified above
   search.sources[0].searchExtent = extent;

   //make sure to start up the widget!
   search.startup();

  map.on("load", enableSpotlight);
  search.on("select-result", showLocation);
  search.on("clear-search", removeSpotlight);

  function showLocation(e) {
     map.graphics.clear();
     var point = e.result.feature.geometry;
     var symbol = new SimpleMarkerSymbol().setStyle(
     SimpleMarkerSymbol.STYLE_SQUARE).setColor(
       new Color([255, 0, 0, 0.5])
     );
     var graphic = new Graphic(point, symbol);
     map.graphics.add(graphic);

     map.infoWindow.setTitle("Search Result");
     map.infoWindow.setContent(e.result.name);
     map.infoWindow.show(e.result.feature.geometry);

     var spotlight = map.on("extent-change", function () {
        var geom = screenUtils.toScreenGeometry(map.extent,  map.width, map.height, e.result.extent);
        var width = geom.xmax - geom.xmin;
        var height = geom.ymin - geom.ymax;

        var max = height;
        if (width > height) {
           max = width;
        }

        var margin = '-' + Math.floor(max / 2) + 'px 0 0 -' + Math.floor(max / 2) + 'px';

        query(".spotlight").addClass("spotlight-active").style({
           width: max + "px",
           height: max + "px",
           margin: margin
        });
        spotlight.remove();
      });
   }

  function enableSpotlight() {
    var html = "<div id='spotlight' class='spotlight'></div>"
    domConstruct.place(html, dom.byId("map_container"), "first");
  }

  function removeSpotlight() {
    query(".spotlight").removeClass("spotlight-active");
    map.infoWindow.hide();
    map.graphics.clear();
  }

});
