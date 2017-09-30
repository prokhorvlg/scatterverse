// Defines dimensions of SVG
var width = 1140;
var height = 542;

// Appends SVG Canvas to document body
var svg = d3.select("#type680SVG").append("center").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("margin-left", -width);

// Initialize arrays to store data regarding items to be generated on SVG

// XY Coordinates of all nodes
var xy = [];
var itemTitles = [];
var itemDescriptions = [];

// Parses CSV file with all node data, appends it to appropriate array
// Relies on Papa library
Papa.parse("js/data/type680.csv", {
  download: true,
  step: function(row) {
    if (row.data[0][0] != "x" && row.data[0][0] != ""){
      if (row.data[0][0] == "point"){
        xy.push([parseInt(row.data[0][1]), parseInt(row.data[0][2])]);
        itemTitles.push(row.data[0][3]);
        itemDescriptions.push(row.data[0][4]);
      }
    }

  },
  complete: function() {
    // Once parse is complete, run the function that draws the elements
    makeMap();
  }
});

// Accepts array of coordinates of nodes, adjusts each value 50% of the height and width of the canvas to center them on the screen
function centerCoordinates(xy){
  for (var i = 0; i < xy.length; i++){
    xy[i][0] = xy[i][0] + width/2;
    xy[i][1] = xy[i][1] + height/2;
  }
  return xy;
}

var itemTitle = (function(){
  var a = -1;
  return function(){
    a++;
    return itemTitles[a];
  }
})();

// Generate custom IDs for each element when called.
// Any given item in a group will have the same number as the other items associated with it
var mainID = (function(){var a = 0; return function(){return a++}})();
var gID = (function(){var a = 0; return function(){return "g_" + a++}})();
var circleID = (function(){var a = 0; return function(){return "circle_" + a++}})();
var textID = (function(){var a = 0; return function(){return "text_" + a++}})();

// Radius of invisible circle that intercepts hover event over nodes
var hitBoxRadius = 30;
var circleRBefore = 10;
var circleRAfter = 50;

// Function that draws the elements in the arrays after the parse is complete
function makeMap(){

  var groupNode = svg.selectAll("g")
    .data(centerCoordinates(xy), function(d) { return d.name; })
    .enter().append("g")
      .attr("class", "groupNode")
      .attr("pointer-events", "none")
      .attr("id", gID)
      .attr("transform", transform(d3.zoomIdentity));

  var visualCircle = svg.selectAll(".groupNode").append("circle")
    .attr("r", circleRBefore)
    .attr("fill", "rgba(255,255,255,1)")
    .style("opacity", 1)
    .attr("class", "visualCircle")
    .attr("id", circleID);

  var visualLabel = svg.selectAll(".groupNode").append("foreignObject")
    .attr('pointer-events', 'none')
    .style("opacity", 0)
    .style("color", "#fff")
    .attr("width", "300px")
    .attr("height", "100px")
    .style("font-size", "16px")
    .style("font-family", "Open Sans, sans-serif")
    .style("text-shadow", "0 0 10px #000")
    .style("text-transform", "uppercase")
    .html(itemTitle)
    .attr("id", textID)
    .attr("class", "visualLabel")
    .attr("transform", "translate( -150, -10 )");

  var hoverCircle = svg.selectAll(".groupNode").append("circle")
    .attr("r", hitBoxRadius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleClick)
    .attr("id", mainID);

}

function transform(t) {
  return function(d) {
    return "translate(" + t.apply(d) + ")";
  };
}

// Handles MouseOver event for stars
function handleMouseOver(d, i) {

d3.selectAll(".visualCircle").transition()
  .duration(200)
  .style("opacity", 1)
  .attr("fill", "rgba(255,255,255,0.8)")
  .attr("r", circleRBefore);

d3.selectAll(".visualLabel").transition()
  .duration(200)
  .style("opacity", 0);

d3.select("#circle_" + this.id).transition()
  .duration(200)
  .style("opacity", 0.2)
  .attr("fill", "rgba(255,255,255,0)")
  .attr("r", circleRAfter);

d3.select("#text_" + this.id).transition()
  .duration(200)
  .style("opacity", 1);
    
document.getElementById("type680target").innerHTML = "<h4>" + itemTitles[this.id] + "</h4><hr class='light' style='margin-left: 0px;'><p class='text-justify'>" + itemDescriptions[this.id] + "</p>";

}

// Handles MouseOut event for stars
function handleMouseOut(d, i) {

/*
d3.select("#circle_" + this.id).transition()
  .duration(200)
  .style("opacity", 1)
  .attr("fill", "rgba(255,255,255,1)")
  .attr("r", circleRBefore);

d3.select("#text_" + this.id).transition()
  .duration(200)
  .style("opacity", 0);
*/

}

function handleClick(d, i) {

}

function redrawToSmall(){

  // Extract the width and height that was computed by CSS.
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Use the extracted size to set the size of an SVG element.
  svg
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

  d3.selectAll(".fullScreenSize")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);
}