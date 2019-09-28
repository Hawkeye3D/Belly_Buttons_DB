function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
let thisurl="/metadata/<sample>"
 let dataset =d3.json(thisurl).then(function(data){
 // Use d3 to select the panel with id of `#sample-metadata`
    // The HTML Element where we want to populate
      for( let [key,value] of Object.entries(data)) {
     console.log(`${key} ${value}`);
   }
    let d3Sampler = d3.select("#html_id_sample-metadata")
     d3Sampler.html("") // Use `.html("") to clear any existing metadata
 genConstructList('html_id_sample-metadata',data)
 });
   
 

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    
}
/**Function to build Gauge
 * 
 */
function buildGauge(data){
 
}
function genConstructList(elementname,arrlist){
  // First, update existing elements
d3.select(elementname) //"ul", for example
.selectAll("li") //list item
.data(arrlist) //our list
.text(function(d) {
  return d;
});

// Second, create new elements for extra data points
d3.select(elementname)
.selectAll("li")
.data(arrlist)
.enter()
.append("li")
.text(function(d) {
  return d;
});
}

/**
//  * Helper function to select stock data
//  * Returns an array of values
//  * @param {array} rows
//  * @param {integer} index
//  * index 0 - Date
//  * index 1 - Open
//  * index 2 - High
//  * index 3 - Low
//  * index 4 - Close
//  * index 5 - Volume
//  */
// funct
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
function buildCharts(sample) {
console.log(sample)
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    return
}

function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      console.log(sample)
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(sampleNames[0])
   buildCharts(firstSample);
   buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
