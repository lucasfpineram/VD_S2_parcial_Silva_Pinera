d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  //Acá filtro los datos de los barrios que quieren ustedes
  let dataAlgunosBarrios= data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO' );
  
  // de todos los barrios me quedo solo con los casos cerrados
  let casosCerrados = dataAlgunosBarrios.filter(item => item.estado_del_contacto == "Cerrado" )
  
  // acá filtro las fechas y agrego una nueva columna al dataset con el mes de cierre
  // acá filtro las fechas y agrego una nueva columna al dataset con el mes de cierre
  casosCerrados.forEach(item => {
    let fechaCierre = (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) != null ?  (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) :  (d3.timeParse('%d-%m-%Y')(item.fecha_cierre_contacto))
    item.mes_fecha_cierre_num = fechaCierre.getMonth()  });
  
  let chart = Plot.plot({
        marks: [
          Plot.line(
            casosCerrados,
            Plot.groupX({ y: "count" }, 
            { x: "mes_fecha_cierre_num",
              stroke:"domicilio_barrio",
              curve: 'cardinal',
              strokeWidth: 5
             })
          )
        ],
    x: {
      label: "Mes de Fecha de Cierre",
      tickFormat: (d) => extraerMes(d),
      tickSize: 12
    },

    y: {
      label: "Suma de Solicitudes Cerradas",
      fill: 'domicilio_barrio',
      domain: [0,35],
      tickSize: 12,
      inset: 0,
      ticks: 5
    },
    style: {
      backgroundColor: "light bro",
      color: "black",
      fontFamily:"Poppins",
      fontSize: "30px",
      overflow: "visible"
    }, 
    color: { 
      legend: true, 
      // range: ['#0087db','#5de162','#e84351']
      range: ['#c17fc6','#ffc500','#de3d51']
    },
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    marginBottom: 90,
    grid: true,
    line: true,
    height: 650,
    width: 1500, 
  })

  d3.select('#chart_3').append(() => chart)
}).catch(error => {
  console.log(error);
});

function extraerMes(dat){
  switch (dat){
    case 0:
      return "Enero"
    case 1: 
      return "Feb"
    case 2: 
      return "Marzo"
    case 3: 
      return "Abril"
    case 4: 
      return "Mayo"
    case 5: 
      return "Junio"
    case 6: 
      return "Julio"
    case 7: 
      return "Agosto"
    case 8: 
      return "Sep"
    case 9: 
      return "Oct"
    case 10: 
      return "Nov"
    case 11: 
      return "Dic"       
  }
}
