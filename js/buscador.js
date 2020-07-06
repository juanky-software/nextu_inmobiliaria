$(function(){

  // Al cargar la pagina
  $.ajax({
    url: 'php/casas.php',
    method: 'get',
    success: (respuesta) => {
      let respuesta_json = JSON.parse(respuesta)
      let ciudades = []
      let tipos = []
      // Ciudades
      respuesta_json.forEach(info_casa => {        
        if (ciudades.find(x => x == info_casa.Ciudad) == undefined) {
          ciudades.push(info_casa.Ciudad)
        }
        if (tipos.find(x => x == info_casa.Tipo) == undefined) {
          tipos.push(info_casa.Tipo)
        }
      });
      ciudades.forEach(ciudad => {
        $('#selectCiudad').append('<option value="'+ ciudad +'">'+ciudad+'</option>')
      });
      // Tipo
      tipos.forEach(tipo => {
        $('#selectTipo').append('<option value="'+ tipo +'">'+tipo+'</option>')
      });
    }
  })
  
  function mostrar_casas(x){
    let datosJson = JSON.parse(x)
    console.log(datosJson);
    
    let contenido_html = ''
    datosJson.forEach((casa) => {
      contenido_html += '<div class="itemMostrado">'
      contenido_html += '<img src="img/home.jpg" alt="">'
      contenido_html += '<div class="textoInformacion">'
      contenido_html += '<p><b>Dirección: </b>'+casa.Direccion+'</p>'
      contenido_html += '<p><b>Ciudad: </b>'+casa.Ciudad+'</p>'
      contenido_html += '<p><b>Teléfono: </b>'+casa.Telefono+'</p>'
      contenido_html += '<p><b>Código postal: </b>'+casa.Codigo_Postal+'</p>'
      contenido_html += '<p><b>Tipo: </b>'+casa.Tipo+'</p>'
      contenido_html += '<p class="precioTexto"> '+casa.Precio+'</p>'
      contenido_html += '<p class="textoVerMas">Ver más</p>'
      contenido_html += '</div></div>'
    })
    $('#contenidoVariable').html(contenido_html)
  }

  // Filtrar casas
  $('#formulario').submit((event) => {
    let ciudad = $('#selectCiudad').val()
    let tipo = $('#selectTipo').val()
    let precio = $('#rangoPrecio').val().split(';')
    let precio_minimo = parseFloat(precio[0])
    let precio_maximo = parseFloat(precio[1])
    $.ajax({
      url: 'php/buscar_casa.php',
      method: 'get',
      data: {
        ciudad: ciudad,
        tipo: tipo,
        precio_minimo: precio_minimo,
        precio_maximo: precio_maximo
      },
      success: (respuesta) => {
        mostrar_casas(respuesta)
      }
    })
    event.preventDefault()
  })

  // Mostrar todas las casas
  $('#mostrarTodos').click(() => {
    $.ajax({
      url: 'php/casas.php',
      method: 'get',
      success: (respuesta) => {
        mostrar_casas(respuesta)
      }
    })
  })

})