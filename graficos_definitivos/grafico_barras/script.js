// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [4],
}
d3.formatDefaultLocale(locale)
d3.dsv(';', '147_desratizacion.csv', d3.autoType).then(data => {
  console.log(data)
  let cerrado = data.filter(item => (item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO') && item.estado_del_contacto);
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      grid: true,
      tickFormat: d3.format(',.0f'),
    },
    y: {
      label: '',
    },
    marks: [
      Plot.barX(
        cerrado.filter(item => item.estado_del_contacto == 1),
        Plot.groupY(
          { x: 'count', title: d => JSON.stringify(d) },
          {
            y: 'domicilio_barrio',
            sort: { y: 'x', reverse: true },
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
    marginLeft: 200,
    marginRight: 100,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})