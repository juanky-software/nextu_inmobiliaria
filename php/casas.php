<?php
  $archivo = file_get_contents("data-1.json");
  $casas = json_decode($archivo, true);

  echo json_encode($casas);
?>