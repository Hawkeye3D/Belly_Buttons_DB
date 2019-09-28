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
  d3.json(`/samples/${sample}`).then(function (data) {
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

    let plotdata = [bubble]
    let layout = {
      xaxis: { title: "OTU ID" },

    };
    Plotly.newPlot("bubble", plotdata, layout);

    // @TODO: Build a Pie Chart
    const toprecs = 10
    d3.json(`/samples/${sample}`).then(function (data) {
      let values = data.sample_values.slice(0, toprecs);
      let labels = data.otu_ids.slice(0, toprecs);
      let display = data.otu_labels.slice(0, toprecs);

      let pie_chart = [
        {
          values: values,
          lables: labels,
          hovertext: display,
          type: "pie"
        }
      ];
      //Plotly ties HTML to the data,defining the type of chart 
      //HTML must have 'pie' DIV
      Plotly.newPlot('pie', pie_chart);
    });
  });
};
function buildGauge(sample) {
  d3.json(`/samples/${sample}`).then(function (data) {


    var gageData = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5,
        title: { text: "Frequency", font: { size: 24 } },
        delta: { reference: 2, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "black",
          borderwidth: 2,
          bordercolor: "navy",
          steps: [
            { range: [0, 1], color: rgb(0, 255, 0) },
            { range: [1, 2], color: rgb(32, 223, 0) },
            { range: [2, 3], color: rgb(62, 191, 0) },
            { range: [3, 4], color: rgb(94, 159, 0) },
            { range: [4, 5], color: rgb(127, 127, 64)},
            { range: [5, 6], color: rgb(159, 94, 0) },
            { range: [6, 7], color: rgb(191, 62, 0) },
            { range: [7, 8], color: rgb(223, 32, 0) },
            { range: [8, 9], color: rgb(255, 0, 0) }
          ]              

        }
      }
    ] 
    let layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gageData, layout);
  }) //end of d3 call
 
}

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
    // buildGauge(firstsample)
    buildMetadata(firstSample);
  
  });
}
/**
 * Routine that is called when t
 * @param {Selected Item} newSample 
 */
function optionChanged(newSample) {
   
  buildCharts(newSample);
  // buildGauge(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();