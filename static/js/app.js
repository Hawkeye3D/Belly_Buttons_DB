function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  let URL = `/metadata/${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(URL).then(function(sample){
      let sampleData = d3.select(`#sample-metadata`);
    // Use `.html("") to clear any existing metadata
      sampleData.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(sample).forEach(function([key,value]){
        let row = sampleData.append("p");
        row.text(`${key}:${value}`)
      })
    });
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  //`/samples/${sample}` is the Python route
  // json talks to the datasource
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(`/samples/${sample}`).then(function(data){
    let x_axis = data.otu_ids;
    let y_axis = data.sample_values;
    let texts = data.otu_labels;
    let size = data.sample_values;
    let color = data.otu_ids;
    
  
    let bubble = {
      x: x_axis,
      y: y_axis,
      text: texts,
      mode: `markers`,
      marker: {
        size: size,
        color: color
      }
    };

    let data = [bubble];
    let layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart
    d3.json(`/samples/${sample}`).then(function(data){
      let values = data.sample_values.slice(0,10);
      let labels = data.otu_ids.slice(0,10);
      let display = data.otu_labels.slice(0,10);

      let pie_chart = [{
        values: values,
        lables: labels,
        hovertext: display,
        type: "pie"
      }];
      //Plotly ties HTML to the data,defining the type of chart 
      //HTML must have 'pie' DIV
      Plotly.newPlot('pie',pie_chart);
    });
  });
};

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {

  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    //Initialize Charts 
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
/**
 * Routine that is called when t
 * @param {Selected Item} newSample 
 */
function optionChanged(newSample) {
   
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();