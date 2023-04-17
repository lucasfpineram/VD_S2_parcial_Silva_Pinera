const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', '147_intoxicacion_alimento.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: '#ddd',
        fill: 'transparent',
        title: d => `${d.properties.BARRIO}`,
      }),
      /* Agregamos link a Palermo con la opción href */
      Plot.geo(barrios, {
        href: () => 'https://es.wikipedia.org/wiki/Palermo_(Buenos_Aires)',
        stroke: 'black',
        fill: 'transparent',
        title: d => d.properties.BARRIO,
        filter: d => d.properties.BARRIO == 'PALERMO'
      }),
      Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        r: 1,
        stroke: 'none',
        fill: 'black'
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
