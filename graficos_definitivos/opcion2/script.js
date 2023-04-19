d3.dsv(';','147_desratizacion.csv', d3.autoType).then(data => {
  console.log(data)
  let chart = Plot.plot({
    marks: [
      Plot.barX(data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'CABALLITO' || item.domicilio_barrio == 'VILLA URQUIZA'), 
      Plot.groupY({
        x:
        "sum"
          }{
        y: 'domicilio_barrio',
        x: 'estado_del_contacto',
        sort: { y: 'x', reverse: true, limit: 10 },
          
      }),
    ],
    x: {
      grid: true,
    },
    marginLeft: 100,
  })
  d3.select('#chart').append(() => chart)
})
