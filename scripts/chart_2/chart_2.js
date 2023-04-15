const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'sistema-unico-de-atencion-ciudadana-2021.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      scheme: 'ylorbr',
    },
    marks: [
      Plot.density(data.filter(item => item.prestacion == 'DESRATIZAR, DESINSECTAR Y DESINFECTAR EN VÍA PÚBLICA' || 
                               item.prestacion == 'HIGIENIZACIÓN, DESRATIZACIÓN, SANEAMIENTO DE TERRENO BALDÍO/CASA ABANDONADA' ||
                               item.prestacion == 'DESINFECCIÓN/DESINSECTACIÓN/DESRATIZACIÓN EN ESTABLECIMIENTO EDUCATIVO ESTATAL'), 
          { x: 'lon', y: 'lat', fill: 'density',bandwidth: 15, thresholds: 30 }),
      Plot.geo(barrios, {
        stroke: 'gray',
        title: d => `${d.properties.BARRIOS}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_2').append(() => chartMap)
})
