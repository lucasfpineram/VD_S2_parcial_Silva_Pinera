// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [4],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', '147_15-21_noviembre.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      grid: true,
      tickFormat: d3.format(',.0f'),
    },
    y: {
      label: '',
      tickSize: 0
    },
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: 'count' },
          {
            filter: d => {
              return (
                d.prestacion.includes('ÁRBOL') ||
                d.subcategoria.includes('ÁRBOL') 
              )
            },
            y: 'prestacion',
            sort: { y: 'x', reverse: true },
          },
        ),
      ),
    ],
    marginLeft: 350,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
