<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>See Again!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="scripts/annyang.min.js"></script>
    <link rel=StyleSheet href="estilos/estilo.css" type="text/css" media=screen>
    <link rel="shortcut icon" href="icon.png">
    <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet'>
</head>

<body>
    <header>
        <div class="imagen">
            <div class="elemento"><img class="logo" src="icon.png"> </div>
            <div class="elemento"><h1 class="titulo">See again!</h1></div>
        </div>
    </header>
    
    <button id="iniciar" class="iniciar">Iniciar</button>
    <h1 hidden>Selecciona un dispositivo</h1>
	<section hidden>
		<select name="listaDeDispositivos" id="listaDeDispositivos"></select>
		<button id="boton">Tomar foto</button>
		<p id="estado"></p>
	</section>
	<br>
	<div class="video">
	    <div class="informacion-video">
	            <video muted="muted" id="video"></video>
	            <canvas id="canvas" style="display: none;"></canvas> 
	        <div class="informacion-foto">
        	    <p class="texto">Información de la foto:</p>
        	    <p id="contenido"></p>
    	    </div>
	    </div>
	</div>
	
	<?php
	   include ('imagenes/borrar_imagen.php');
        if($_SESSION["inicio"] == 1){
            echo "<script> $('#iniciar').hide();</script>";
        }
	?>
	
	<script src="camara.js"></script>
	<script src="scripts/ocultar.js"></script>
    <script src="scripts/reconocimiento.js"></script> 
</body>
</html>