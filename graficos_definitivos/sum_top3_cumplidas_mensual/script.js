d3.dsv(';', '147_desratizacion.csv', d3.autoType).then(data => {
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
             })
          )
        ],
    x: {
      label: "Mes de Fecha de Cierre"
    },

    y: {
      label: "Suma de Solicitudes Cerradas"
    },
    height: 200,
    width: 714, 
    color: { legend: true },
    marginLeft: 80,
    marginRight: 80,
    marginTop: 30,
    marginBottom: 50,
    grid: true,
    line: true,
  })

  d3.select('#chart').append(() => chart)
}).catch(error => {
  console.log(error);
});