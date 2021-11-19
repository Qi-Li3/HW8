// selectedDriver = null;
// brushedDrivers = []

// Get the data{}
function join(lookupTable, mainTable, lookupKey, mainKey, select) {
  var l = lookupTable.length,
      m = mainTable.length,
      lookupIndex = [],
      output = [];
  for (var i = 0; i < l; i++) { // loop through l items
      var row = lookupTable[i];
      lookupIndex[row[lookupKey]] = row; // create an index for lookup table
  }
  for (var j = 0; j < m; j++) { // loop through m items
      var y = mainTable[j];
      var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
      output.push(select(y, x)); // select only the columns you need
  }
  return output;
};


d3.csv("lap_times.csv").then(data=> {
  d3.csv("results.csv").then(data2=> {
    data = data.filter(function(d) { return d.raceId == "841"; });
    data2 = data2.filter(function(d) { return d.raceId === "841"; });


    var result = join(data2, data, "driverId", "driverId", function(data, data2) {
      return {
        raceId: data.raceId,
        driverId: data.driverId,
        lap: data.lap,
        position: data2.position,
        time: data.time,
        milliseconds: data.milliseconds,
        fastestLapSpeed: data2.fastestLapSpeed,
          //data2: (data2 !== undefined) ? data2.raceId : null
      }
  })
  




{
result.filter(function(d){
    if(isNaN(d.value)){
        return false;
    }
    d.value = parseInt(d.value, 10);
    return true;});

  //let parseTime = d3.timeParse("%M:%S")
  result.forEach(function (d) {
        d.lap = parseInt(d.lap)
        //d.time = parseTime(d.time);
        d.milliseconds = Number(d.milliseconds/1000)
    });

    //console.log(time);


// Set the dimensions of the canvas / graph
var margin = {top: 10, right: 30, bottom: 20, left: 60},
width = 800 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;


// Set the ranges
var x1 = d3.scaleLinear().range([0, width]);  
var y1 = d3.scaleLinear().range([height, 0]);

// Define the line
var priceline = d3.line()    
.x(function(d) { return x1(d.lap); })
.y(function(d) { return y1(d.milliseconds); });



// Adds the svg canvas
var container1 = d3.select("#charts")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x1.domain(d3.extent(result,d=>d.lap));
    y1.domain(d3.extent(result,d=>d.milliseconds));

    // Group the entries by symbol
    dataNest = Array.from(
	    d3.group(result, d => d.driverId), ([key, value]) => ({key, value})
	  );
  
    // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

      container1.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(i); })
            .attr("d", priceline(d.value))

    });
 var myLine = container1
              .selectAll("path.line")
              .data(result)


    // Add the X Axis
    container1.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1));

    // Add the Y Axis
    container1.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y1));



    var brush1 = d3
      .brush()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("start", clear)
      .on("brush", updateChart1)
      

    //Adding brush to the svg. This tells you where you want to implement the brush.
    container1.call(brush1)

  }









{
  result = result.filter(function(d) {return d.position != "\\N"});

var margin = {top: 10, right: 30, bottom: 20, left: 60},
width = 800 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;
  var sumsat = d3.group(result, d => d.driverId);

  console.log(result)
  
  //result.filter(function(d){
    //if(isNaN(d.value)){
    //    return false;
    //}
    //d.value = parseInt(d.value);
    //return true;});

    //let parseTime = d3.timeParse("%M:%S")
    result.forEach(function (d) {
      d.fastestLapSpeed = Number(d.fastestLapSpeed);
      d.position = parseInt(d.position);
  })


  var container2 = d3
  .select("#charts")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Add X axis
    var x2 = d3.scaleLinear()
                 .domain(d3.extent(result,d=>parseInt(d.position)))
                    .rangeRound([0,width])

                    
    container2
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr('font-size','11px')
          .attr('font-weight','bold')
          .text('Position')
      );

    //Add Y axis
   var y2 = d3.scaleLinear()
                      .domain(d3.extent(result,d=>+(d.fastestLapSpeed)))
                      .rangeRound([height,0])
    container2
      .append("g")
      .call(d3.axisLeft(y2))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .text('Fastest Lap Speed')
          .attr('font-size','11px')
          .attr('font-weight','bold')
          .attr('transform','rotate(-90)')
          .attr('y',-30)
          .attr('x',-120)
      );


    // Add dots
    console.log(result)
    var myCircle2 = container2
    .append("g")
    .selectAll("dot")
    .data(result)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x2(d.position); } )
    .attr("cy", function (d) { return y2(d.fastestLapSpeed); } )
    .attr("r", 4)
    .style("fill", "#920855")
    // .on("click", (event, d) => {
    //   if (d.driverId === selectedDriver) {
    //      selectedDriver = null;
    //   }
    //   else  selectedDriver = d.driverId;
    // })
    // .attr("opacity", 0.8) // make bubbles a bit transparent
    // .attr("fill", d => {
    //   if(d.driverId === selectedDriver) { 
    //     return "#3484c7";
    //   } else if (brushedDrivers.includes(d.driverId)) {
    //     return "#573B9F";
    //   } else {
    //     return "lightgrey";
    //   }
    // })
    // .transition().duration(1000)

    var brush2 = d3
    .brush()
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("start", clear)
    .on("brush", updateChart2);

  //Add brush to svg. Tells you where in the webpage you want to implement the brush
  container2.call(brush2);
  

}


//Removes existing brushes from svg. The clear function is basically getting rid of any previous brush. So, if you brush once, the second time will clear the first brush. 
function clear() {
  container1.call(brush1.move, null);
  container2.call(brush2.move, null);
}

//Is called when we brush on scatterplot #1. ----------------------
function updateChart1(brushEvent) {
  extent = brushEvent.selection;

  //Check all the circles that are within the brush region
  myLine.classed("selected", (d) => {
    return isBrushed(extent, x1(d.lap), y1(d.milliseconds));
  });


  //Select all the data points in plot 2 which have the same id as in plot 1
  myCircle2.classed("selected", (d) => {
    return isBrushed(extent, x1(d.lap), y1(d.milliseconds));
  });
}

//Is called when we brush on scatterplot #2---------------
function updateChart2(brushEvent) {
  extent = brushEvent.selection;
   

  //Check all the circles that are within the brush region
  myCircle2.classed("selected", (d) => {
  return isBrushed(extent, x2(d.position), y2(d.fastestLapSpeed));
     
  });
  myLine.classed("selected", (d) => {
    return isBrushed(extent, x2(d.position), y2(d.fastestLapSpeed));
  });

   
}

//Finds dots within the brushed region
function isBrushed(brush_coords, cx, cy) {
  if (brush_coords === null) return;

  var x0 = brush_coords[0][0],
    x1 = brush_coords[1][0],
    y0 = brush_coords[0][1],
    y1 = brush_coords[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
}



})
})