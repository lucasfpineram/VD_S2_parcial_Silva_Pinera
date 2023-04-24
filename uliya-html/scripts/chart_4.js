d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  let dataAlgunosBarrios = data.filter(item => item.domicilio_barrio == 'PALERMO' || item.domicilio_barrio == 'VILLA URQUIZA' || item.domicilio_barrio == 'CABALLITO');

  // de todos los barrios me quedo solo con los casos cerrados
  let casosCerrados = dataAlgunosBarrios.filter(item => item.estado_del_contacto == "Cerrado")

  //acá filtro las fechas y agrego una nueva columna al dataset con la diferencia de dias entre inicio y cierre
  casosCerrados.forEach(item => {
    let fechaCierre = (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) != null ? (d3.timeParse('%d/%m/%Y')(item.fecha_cierre_contacto)) : (d3.timeParse('%d-%m-%Y')(item.fecha_cierre_contacto))
    let fechaInicio = (d3.timeParse('%d/%m/%Y')(item.fecha_ingreso)) != null ? (d3.timeParse('%d/%m/%Y')(item.fecha_ingreso)) : (d3.timeParse('%d-%m-%Y')(item.fecha_ingreso))
    const diferenciaEnMilisegundos = fechaCierre - fechaInicio;

    // Convertir la diferencia en días
    const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);
    console.log(diferenciaEnDias)
    //Aca le pueden poner el nombre que quieran a la columna, yo le puse cant_dias_cierre
    item.cant_dias_cierre = diferenciaEnDias
  })

  const chart = Plot.plot({
    marks: [
      Plot.barY(
        casosCerrados,
        Plot.groupX({ y: "mean" }, 
        { x: "domicilio_barrio",
          y: "cant_dias_cierre",
          fill: "domicilio_barrio"
        })
      )
    ],
      x:{
        label:' '
      },
  
      y: {
        label: "Promedio de Días",
        fill: 'domicilio_barrio',
        domain: [0,5]
      },
      style: {
        backgroundColor: "light bro",
        color: "black",
        fontFamily:"Poppins",
        fontSize: "20px",
        overflow: "visible"
      }, 
      color: { 
        // range: ['#0087db','#5de162','#e84351']
        range: ['#c17fc6','#ffc500','#de3d51']
      },
        marginBottom: 50,
        marginRight: 70,
        marginLeft: 150,
        marginTop: 50,
        width: 750,
        height: 500,
        line: true,
  })

  d3.select('#chart_4').append(() => chart)
    .catch(error => {
      console.log(error);
    });
})
