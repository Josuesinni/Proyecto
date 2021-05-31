<?php
    $files = glob('imagenes/*.png'); //obtenemos todos los nombres de los ficheros
    foreach($files as $file){
        if(is_file($file))
        unlink($file); //elimino el fichero
        echo '<script>console.log("Imagen eliminada");</script>';
    }
    if (!isset($_SESSION["inicio"])){
        $_SESSION["inicio"] = 0;
    }else{
        $_SESSION["inicio"]=1;
    }
?>