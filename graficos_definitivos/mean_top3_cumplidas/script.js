d3.dsv(';', '147_desratizacion.csv', d3.autoType).then(data => {
  let chart = Plot.plot({
    marks: [
      Plot.rectX(
        data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO'),
        Plot.binY(
          { x: "proportion" },
          {
            x: "estado_del_contacto",
            y: "date",
            fill: "red",
            fillOpacity: 0.4,
            thresholds: d3.utcMonth
          }
        )
      )
    ],
    marginLeft: 100,
    width: 666,
    y: { reverse: true },
    color: {
      legend: true
    }
  });

  d3.select('#chart').node().appendChild(chart);
}).catch(error => {
  console.log(error);
});





// d3.dsv(';','147_desratizacion.csv', d3.autoType).then(data => {
//   let chart = Plot.plot({
//   marks: [
//     Plot.line(
//       data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO'),
//       Plot.normalizeY(
//         "mean",
//         Plot.binX(
//           { y: "sum" },
//           {
//             x: "date",
//             y: "price_in_usd",
//             stroke: "brand",
//             sort: "date",
//             thresholds: d3.utcMonth
//           }
//         )
//       )
//     )
//   ],
//   y: {
//     label: "Price normalized by mean value"
//   },
//   height: 200,
//   width: 666, 
//   color: { legend: true }
// });

// d3.select('#chart').append(() => chart)
// })



// data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO'),