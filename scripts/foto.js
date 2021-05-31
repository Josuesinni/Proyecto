(function() {
    //Pausar reproducción
    $video.pause();

    let contexto = $canvas.getContext("2d");
    $canvas.width = $video.videoWidth;
    $canvas.height = $video.videoHeight;
    
    contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
    let foto = $canvas.toDataURL();
    $estado.innerHTML = "Enviando foto. Por favor, espera...";
    fetch("./imagenes/url_foto.php", {
            method: "POST",
            body: encodeURIComponent(foto),
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            }
        })
        .then(resultado => {
            return resultado.text()
        })
        .then(nombreDeLaFoto => {
            console.log("La foto fue enviada correctamente");
            var n='https://seeagain.000webhostapp.com/imagenes/'+nombreDeLaFoto;
            $estado.innerHTML = `Foto guardada con éxito. Puedes verla <a target='_blank' href='imagenes/${nombreDeLaFoto}'> aquí</a>`;
            var foto=[]
            foto[0]=n;

            var direccion='https://serviciovisionnorte.cognitiveservices.azure.com/vision/v3.0/analyze?visualFeatures=Categories,Description,Objects&details=Landmarks&language=es';
            
            function datos(cont,callback){
                var datosFoto;
                var direccionFoto={
                    url:foto[cont]
                }
                axios.post(direccion,direccionFoto,{
                    headers: {
                        'Ocp-Apim-Subscription-Key':'9f8839e9bd4e446c8d1bfad49bd6db72',
                        'Content-Type':'application/json'
                    }
                }).then(resultado=>{
                    datosFoto={
                        Informacion:resultado.data
                    };
                    callback(datosFoto, (cont + 1));
                }
                ).catch(err=>{
                    console.log("A ocurrido un error. Error:",err.mesagge)
                })
            }
            const a=[];
            let informacionFotoEmocion;
            function imprimeDatos(informacionFoto,numFoto) {
                var j=0;
                
                var ancho=informacionFoto['Informacion'].metadata.height;
                
                var posicionIzquierda=ancho/3;
                var posicionCentro=posicionIzquierda*2;
                var posicionDerecha=posicionIzquierda*3;
                
                var lejos=informacionFoto['Informacion'].metadata.height/9;
                var intermedio=lejos*3;
                var cerca=lejos*5;
                var frente=lejos*7;
                
                var lado;
                var proximidad;
                var objeto;
                
                if(informacionFoto['Informacion'].objects.length!=0){
                do{
                    var rectangulo=informacionFoto['Informacion'].objects[j].rectangle;
                    
                    var x=informacionFoto['Informacion'].objects[j].rectangle.x;
                    var w=informacionFoto['Informacion'].objects[j].rectangle.w;
                    var h=informacionFoto['Informacion'].objects[j].rectangle.h;
                    var puntox=x+(w/2);//x+w;
                    //var puntoy=y+h;
                    switch(informacionFoto['Informacion'].objects[j].object){
                        case 'car':
                            objeto='un carro';
                            acciones();
                        break;
                         case 'dog':
                            objeto='un perro';
                            acciones();
                        break;
                        case 'cat':
                            objeto='un gato';
                            acciones();
                        break;
                        case 'person':
                            objeto='una persona';
                            detPosicion();
                            codProximidad();
                            informacionFotoEmocion={'Foto':numFoto,'Lado':lado,'Proximidad':proximidad};
                            cara(imprimeDatosCara);
                        break;
                        case 'tree':
                            objeto='un arbol';
                            acciones();
                        break;
                        case 'chair':
                            objeto='una silla';
                            acciones();
                        break;
                        case 'table':
                            objeto='una mesa';
                            acciones();
                        break;
                        case 'door':
                            objeto='una puerta';
                            acciones();
                        break;
                        case 'couch':
                            objeto='un sillon o sofá';
                            acciones();
                        break;
                        case 'television':
                            objeto='una televisión';
                            acciones();
                        break;
                        default:
                            console.log("No logro identificar el objeto: "+informacionFoto['Informacion'].objects[j].object);
                        break;
                    }
                    j++;
                
                } while(j<informacionFoto['Informacion'].objects.length);
                }else{
                    a.push({'Foto':numFoto,'Lado':"Esta despejado",'Proximidad':"No hay"});
                }
                
                var listaElementos = a.map(function(bar){
                  return '<p> Foto:'+''+bar.Foto+'<br>'+'Lado: '+bar.Lado+'<br>'+'Proximidad: '+bar.Proximidad+'</p>';
                })
                var contenidoInfo = a.map(function(obj){
                  return obj.Lado+" y "+obj.Proximidad;
                })
                
                document.getElementById("contenido").innerHTML = listaElementos;
                var texto=contenidoInfo;
                
                if ( 'speechSynthesis' in window ) {
                    speechSynthesis.cancel();
                    speechSynthesis.getVoices();
                }
                speechSynthesis.speak(new SpeechSynthesisUtterance(texto));

                function detPosicion(){
                    //Posicion
                    if(puntox>=0&&puntox<posicionIzquierda){
                        lado="Hay " +objeto+ " en la izquierda";
                    }else if(puntox>=posicionIzquierda&&puntox<posicionCentro){
                        lado="Hay " +objeto+ " en el centro";
                    }else{
                        lado="Hay " +objeto+ " en la derecha";
                    }
                }
                function codProximidad(){
                //Proximidad
                    if(h<lejos){
                        proximidad="Esta muy lejos";
                    }else if(h>=lejos&&h<intermedio){
                        proximidad="Esta lejos";
                    }else if(h>=intermedio&&h<cerca){
                        proximidad="Esta un poco lejos";
                    }else if(h>=cerca&&h<frente){
                        proximidad="Esta muy cercano a ti";
                    }else{
                        proximidad="Esta frente tuyo";
                    }
                }
                function acciones(){
                    detPosicion();
                    codProximidad();
                    a.push({'Foto':numFoto,'Lado':lado,'Proximidad':proximidad});
                }
                
                function cara(callback){
                var datos = { 
                    url: "https://seeagain.000webhostapp.com/imagenes/"+nombreDeLaFoto
                };
                var direccion = 'https://servicioface.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId&returnFaceAttributes=Gender,Emotion';
                axios.post( direccion, datos, {
                    headers : {
                        'Ocp-Apim-Subscription-Key': '326d364a0fbe4a39998455172d1a3b46',
                        'Content-Type': 'application/json'
                    }
                })
                .then( respuesta => {
                    datosCara={
                        informacionCara:respuesta.data
                    };
                    callback(datosCara);
                })
                .catch( error => console.log(error));
                }
                
                
                function imprimeDatosCara(infoCara){
                    //Si hay algún dato de la cara nos dirán las emociones que refleja su rostro
                    if(infoCara['informacionCara']!=""){
                        //console.log(infoCara['informacionCara'][0].faceAttributes.emotion);
                        //Añadimos los valores de las emociones
                        var emociones=[infoCara['informacionCara'][0].faceAttributes.emotion['anger'], infoCara['informacionCara'][0].faceAttributes.emotion['contempt'], infoCara['informacionCara'][0].faceAttributes.emotion['disgust'], infoCara['informacionCara'][0].faceAttributes.emotion['fear'], infoCara['informacionCara'][0].faceAttributes.emotion['fear'], infoCara['informacionCara'][0].faceAttributes.emotion['happiness'], infoCara['informacionCara'][0].faceAttributes.emotion['neutral'], infoCara['informacionCara'][0].faceAttributes.emotion['sadness'], infoCara['informacionCara'][0].faceAttributes.emotion['surprise']];
                        //Añadimos las emociones
                        var emocion=['ira','desprecio','disgusto','miedo','felicidad','imparcialidad','tristeza','sorpresa'];
                        //Detectamos el valor maximo dentro de las emociones
                        var maxEmocion=(Math.max(...emociones));
                        var j=0;
                        var b;
                        //Buscamos entre los valores de las emociones para detectar el que fue igual al maximo
                        do{
                            //Detectamos el que es igual para determinar su posición
                            if(maxEmocion==emociones[j]){
                                b=j-1;
                                console.log(emocion[b]);
                                var emocionDetect="Detectamos la emocion de "+emocion[b]+" en esta persona";
                                informacionFotoEmocion.Emocion=emocionDetect;
                                a.push(informacionFotoEmocion);
                                break;
                            }
                            j++
                        }
                        while(emociones.length>=j)
                    }else{
                        console.log("No hemos podido identificar el rostro");
                        var emocionDetect="No hemos podido identificar el rostro";
                        informacionFotoEmocion.Emocion=emocionDetect;
                        a.push(informacionFotoEmocion);
                    }
                    var listaElementos = a.map(function(bar){
                      return '<p> Foto:'+''+bar.Foto+'<br>'+'Lado: '+bar.Lado+'<br>'+'Proximidad: '+bar.Proximidad+'<br>'+'Emoción: '+bar.Emocion+'</p>';
                    })
                    var contenidoInfo = a.map(function(obj){
                      return obj.Lado+", "+obj.Proximidad+", y "+obj.Emocion;
                    })
                    
                    document.getElementById("contenido").innerHTML = listaElementos;
                    var texto=contenidoInfo;
                    
                    if ( 'speechSynthesis' in window ) {
                        speechSynthesis.cancel();
                        speechSynthesis.getVoices();
                    }
                    speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
                }
            }
                datos(0, imprimeDatos);
        })
    $video.play();
})();
