// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [4],
}
d3.formatDefaultLocale(locale)
d3.dsv(';', '147_desratizacion_01.csv', d3.autoType).then(data => {
  console.log(data)
  let cerrado = data.filter(item => (item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO') && item.estado_del_contacto);
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    width: 800, // Ancho del gráfico
    height: 300,
    
    x: {
      grid: true,
      tickFormat: d3.format(',.0f'),
      label: "Solicitudes Cerradas"
    },
    y: {
      label: '',
    },
    marks: [
      Plot.barX(
        cerrado.filter(item => item.estado_del_contacto == 1),
        Plot.groupY(
          { x: 'count', title: d => JSON.stringify(d),
         },
          {
            y: 'domicilio_barrio',
            sort: { y: 'x', reverse: true },
            fill: "domicilio_barrio",
          },
        ),
      ),
      Plot.text(
        cerrado,
        Plot.groupY(
          { x: 'count', text: 'count' },
          {
            y: 'domicilio_barrio',
            textAnchor: 'start',
            dx: 5,
            
          },
        ),
        
      ),
    ],
    marginLeft: 100,
    marginRight: 40,
    // height: 200,
    // width: 714, 
    // marginTop: 30,
    marginBottom: 50,
    line: true,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})

