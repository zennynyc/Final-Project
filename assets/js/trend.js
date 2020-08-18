// Default plot

function init() {

  var trace1 = {
    type: 'scatter',
    x: [2020-08-08, 2020-08-09, 2020-08-10, 2020-08-11, 2020-08-12, 2020-08-13, 2020-08-14, 2020-08-15],
    y: [0.2004, 0.2172, 0.1988, 0.1852, 0.2030, 0.1804, 0.2112, 0.2184],
    mode: 'lines+markers',
    name: 'All'
  };

  var data = [trace1];

  var layout = {
    title: "The Overall Trend",
    showlegend: false,
    xaxis: {
      title: 'Date',
      showline: true,
      showgrid: true,
      zeroline: false,
      showticklabels: true,
      autotidck: false,
      ticks: 'outside',
      ticktext: ['Aug 8 2020', 'Aug 9', 'Aug 10', 'Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15'],
      tickvals: [2020-08-08, 2020-08-09, 2020-08-10, 2020-08-11, 2020-08-12, 2020-08-13, 2020-08-14, 2020-08-15]
    },
    yaxis: {
      title: 'Average Sentiment',
      showgrid: false,
      zeroline: true,
      showline: true,
      range: [0, 0.42]
    }

  };

  var CHART = d3.selectAll("#overall_plot").node();

  Plotly.newPlot(CHART, data, layout);

};

d3.selectAll("body").on("change", updatePlotly);

function updatePlotly() {

  var dropdownMenu = d3.select("#selDataset");

  var dataset = dropdownMenu.node().value;

  var CHART = d3.selectAll("#overall_plot").node();

  var y = [];

  switch(dataset) {

    case 'all':
      y = [0.2004, 0.2172, 0.1988, 0.1852, 0.2030, 0.1804, 0.2112, 0.2184];
      break;

    case 'topic1':
      y = [0.124131, 0.148915, 0.174428, 0.160484, 0.142077, 0.127745, 0.152017, 0.178794];
      break;

    case 'topic2':
      y = [0.129319, 0.073473, 0.054435, 0.068493, 0.085011, 0.075325, 0.106231, 0.115385];
      break;

    case 'topic3':
      y = [0.297632, 0.412253, 0.345771, 0.316934, 0.317443, 0.288419, 0.336623, 0.408451];
      break;

    case 'topic4':
      y = [0.331882, 0.285449, 0.306483, 0.301251, 0.346867, 0.325581, 0.340149, 0.323556];
      break;

    case 'topic5':
      y = [0.106878, 0.170759, 0.140370, 0.079300, 0.101891, 0.100767, 0.123827, 0.064870];
      break;

  }

  Plotly.restyle(CHART, 'y', [y]);

}

init();
