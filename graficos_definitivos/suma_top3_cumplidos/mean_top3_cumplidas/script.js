d3.dsv(';','147_desratizacion.csv', d3.autoType).then(data => {
  let cerrado = data.filter(item => item.estado_del_contacto == 'Cerrado');
  let chart = Plot.plot({
  marks: [
    Plot.rectX(
      cerrado.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO'),
      Plot.binY(
        { x: "sum" },
        {
          x: "cantidad_de_solicitudes_cerradas",
          y: "barrios",
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

d3.select('#chart').append(() => chart)
})


// d3.dsv(';','147_desratizacion.csv', d3.autoType).then(data => {
//   let chart = Plot.plot({
//   marks: [
//     Plot.rectX(
//       data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO'),
//       Plot.binY(
//         { x: "proportion" },
//         {
//           x: "proporcion",
//           y: "date",
//           fill: "red",
//           fillOpacity: 0.4,
//           thresholds: d3.utcMonth
//         }
//       )
//     )
//   ],
//   marginLeft: 100,
//   width: 666,
//   y: { reverse: true }, 
//   color: {
//     legend: true
//   }
// });

// d3.select('#chart').append(() => chart)
// })


