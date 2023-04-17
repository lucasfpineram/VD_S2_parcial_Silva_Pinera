const mapaFetch = d3.json('palermo.geojson')
const dataFetch = d3.dsv(';', '147_intoxicacion_alimento.csv', d3.autoType)

d3.json('palermo.geojson').then((palermo) => {

  
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: palermo, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(palermo, {
        stroke: '#ddd',
        fill: 'transparent',
        title: d => `${d.properties.BARRIO}`,
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
