<?php
  $archivo = file_get_contents("data-1.json");
  $casas = json_decode($archivo, true);

  $ciudad = $_GET['ciudad'];
  $tipo = $_GET['tipo'];
  $precio_minimo = intval($_GET['precio_minimo']);
  $precio_maximo = intval($_GET['precio_maximo']);

  // Filtro por precio
  $filtro_precio = array();
  foreach ($casas as $value) {
    $precio_casa = str_replace(",", "", $value);
    $precio_casa = substr($precio_casa["Precio"], 1);
    $precio_casa = intval($precio_casa);
    if ($precio_casa >= $precio_minimo && $precio_casa <= $precio_maximo) {
      array_push($filtro_precio, $value);
    }
  }

  // Filtro por ciudad
  $filtro_ciudad = array();
  if ($ciudad != '') {
    foreach ($filtro_precio as $value) {
      if ($ciudad == $value["Ciudad"]) {
        array_push($filtro_ciudad, $value);
      } 
    }
  } else {
    $filtro_ciudad = $filtro_precio;
  }

  // Filtro por tipo
  $filtro_tipo = array();
  if ($tipo != '') {
    foreach ($filtro_ciudad as $value) {
      if ($tipo == $value["Tipo"]) {
        array_push($filtro_tipo, $value);
      } 
    }
  } else {
    $filtro_tipo = $filtro_ciudad;
  }
  
  echo json_encode($filtro_tipo);
?>