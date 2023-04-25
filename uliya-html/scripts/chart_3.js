d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  //Acá filtro los datos de los barrios que quieren ustedes
  let dataAlgunosBarrios= data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO' );
  
  // de todos los barrios me quedo solo con los casos cerrados
  let casosCerrados = dataAlgunosBarrios.filter(item => item.estado_del_contacto == "Cerrado" )
  
  // acá filtro las fechas y agrego una nueva columna al dataset con el mes de cierre
  casosCerrados.forEach(item => {
    let fechaCierre = (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) != null ?  (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) :  (d3.timeParse('%d-%m-%Y')(item.fecha_cierre_contacto))
    item.mes_fecha_cierre = fechaCierre.toLocaleString('es', { month: 'long' });

  });
  
  let chart = Plot.plot({
        marks: [
          Plot.line(
            casosCerrados,
            Plot.groupX({ y: "count" }, 
            { x: "mes_fecha_cierre",
              stroke:"domicilio_barrio",
              curve: 'cardinal',
              strokeWidth: 5
             })
          )
        ],
    x: {
      label: "Mes de Fecha de Cierre",
    },

    y: {
      label: "Suma de Solicitudes Cerradas",
      fill: 'domicilio_barrio',
      domain: [0,35],
      // tickCount: 8,
    },
    style: {
      backgroundColor: "light bro",
      color: "black",
      fontFamily:"Poppins",
      fontSize: "22px",
      overflow: "visible"
    }, 
    
    // height: 200,
    // width: 714, 
    color: { 
      legend: true, 
      // range: ['#0087db','#5de162','#e84351']
      range: ['#c17fc6','#ffc500','#de3d51']
    },
    marginLeft: 80,
    marginRight: 80,
    marginTop: 60,
    marginBottom: 70,
    grid: true,
    line: true,
    // columns: null,
    height: 650,
    width: 1500, 
  })

  d3.select('#chart_3').append(() => chart)
}).catch(error => {
  console.log(error);
});

// d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
//   //Acá filtro los datos de los barrios que quieren ustedes
//   let dataAlgunosBarrios= data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO' );
  
//   // de todos los barrios me quedo solo con los casos cerrados
//   let casosCerrados = dataAlgunosBarrios.filter(item => item.estado_del_contacto == "Cerrado" )
  
//   // acá filtro las fechas y agrego una nueva columna al dataset con el mes de cierre
//   casosCerrados.forEach(item => {
//     let fechaCierre = (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) != null ?  (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) :  (d3.timeParse('%d-%m-%Y')(item.fecha_cierre_contacto))
//     item.mes_fecha_cierre = d3.timeFormat('%m')(fechaCierre);
//   });
  
//   casosCerrados.sort((a, b) => d3.ascending(new Date(a.fecha_cierre_contacto), new Date(b.fecha_cierre_contacto)));
  
//   let chart = Plot.plot({
//     marks: [
//       Plot.line(
//         casosCerrados,
//         Plot.groupX({ y: "count" }, 
//         { x: "mes_fecha_cierre",
//           stroke:"domicilio_barrio",
//           curve: 'cardinal',
//           strokeWidth: 5
          
//           // title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} solicitudes`,
//          })
//       )
//     ],
//     x: {
//       label: "Mes de Fecha de Cierre",
//     },
//     y: {
//       label: "Suma de Solicitudes Cerradas",
//       fill: 'domicilio_barrio',
//       domain: [0,35],
//       // tickCount: 8,
//     },
//     style: {
//       backgroundColor: "light bro",
//       color: "black",
//       fontFamily:"Poppins",
//       fontSize: "28px",
//       overflow: "visible",
//     }, 
//     color: { 
//       legend: true, 
//       range: ['#c17fc6','#ffc500','#de3d51']
//     },
//     marginLeft: 80,
//     marginRight: 80,
//     marginTop: 60,
//     marginBottom: 70,
//     grid: true,
//     line: true,
//     height: 750,
//     width: 1500, 
//   })

//   d3.select('#chart_3').append(() => chart)
// }).catch(error => {
//   console.log(error);
// });
