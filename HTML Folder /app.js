// Create an array of each country's numbers
var Positive = Object.values(data.Positive);
var Negative = Object.values(data.Negative);
var Neutral = Object.values(data.Neutral);

// Create an array of music provider labels
var labels = Object.keys(data.Positive);

// Display the default plot
function init() {
  var data = [{
    values: Positive,
    labels: labels,
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];

  if (dataset == 'Positive') {
      data = Positive;
  }
  else if (dataset == 'Negative') {
      data = Negative;
  }
  else if (dataset == 'Neutral') {
      data = Neutral;
  }
  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();
//save