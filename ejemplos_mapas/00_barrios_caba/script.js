const mapaFetch = d3.json('barrios-caba.geojson')

d3.json('barrios-caba.geojson').then(barrios => {
  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: 'gray',
      }),
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
