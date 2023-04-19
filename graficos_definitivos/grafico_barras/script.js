
// Load data from CSV file
const dataFetch = await d3.csv('147_01-07_enero.csv', d3.autoType);

// Extract necessary data for the plot
const neighborhoods = dataFetch.map((d) => d.neighborhood);
const rat_complaints_data = dataFetch.map((d) => d.rat_complaints);
const waste_complaints_data = dataFetch.map((d) => d.waste_complaints);

// Define the data to be plotted
const plotData = [
  {
    x: rat_complaints_data,
    y: neighborhoods,
    type: 'bar',
    name: 'Quejas sobre ratas',
    orientation: 'h',
    marker: {
      color: '#1f77b4',
    },
  },
  {
    x: waste_complaints_data,
    y: neighborhoods,
    type: 'bar',
    name: 'Quejas sobre residuos',
    orientation: 'h',
    marker: {
      color: '#ff7f0e',
    },
  },
];

// Define the layout of the plot
const layout = {
  title: 'Cantidad de quejas por tipo y barrio',
  xaxis: {
    title: 'Cantidad de quejas',
  },
  yaxis: {
    title: 'Barrio',
  },
  barmode: 'group',
};

// Render the plot
Plotly.newPlot('myPlot', plotData, layout);
