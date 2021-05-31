document.addEventListener("DOMContentLoaded",function(){
    if (!annyang) {
    alert("Lo siento, tu navegador no soporta el reconocimiento de voz :(");
    return;
    }
annyang.setLanguage("es-MX");
let comandos = {
    "Comandos":()=>{
        var introduccion="Estos son los comandos con los que cuenta";
        var comando1="Tomar foto: Toma una sola foto y la analiza.";
        var comando2="Hacer Seguimiento: Toma una foto cada 6 segundos y las analiza.";
        var comando3="Detener Seguimiento: Detiene el seguimiento.";
        var comando4="Camara disponibles: Te dice las camaras disponibles del dispositivo.";
        var comando5="Cambiar a camara: Menciona el número de la camara a la cual deseas cambiar.";
        sound();
        speechSynthesis.speak(new SpeechSynthesisUtterance(introduccion));
        speechSynthesis.speak(new SpeechSynthesisUtterance(comando1));
        speechSynthesis.speak(new SpeechSynthesisUtterance(comando2));
        speechSynthesis.speak(new SpeechSynthesisUtterance(comando3));
        speechSynthesis.speak(new SpeechSynthesisUtterance(comando4));
        speechSynthesis.speak(new SpeechSynthesisUtterance(comando5));
    },
    "Tomar foto": () => {
        var fot="Tomando foto";
        sound();
        speechSynthesis.speak(new SpeechSynthesisUtterance(fot));
        $.getScript("scripts/foto.js");
    },
    "Hacer seguimiento":()=>{
        var seg="Iniciando seguimiento";
        sound();
        speechSynthesis.speak(new SpeechSynthesisUtterance(seg));
        var seguimiento=setInterval('foto()',6000);
    },
    "Detener seguimiento":()=>{
        location.reload();
    },
    "Camaras disponibles": () => {
         $.getScript("scripts/camaras_disponibles.js");
    },
    "Cambiar a *camara": (camara) => {
        const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);
        var numCamara=camara;
        if (numCamara=="cámara 1"){
            cam=0;
        }else if(numCamara=="cámara 2" || numCamara=="cámaras 2"){
            cam=1;
        }else{
            cam=2;
        }
        
        var id;
        let stream;
        (function() {
        const obtenerDispositivos = () => navigator.mediaDevices.enumerateDevices();
        
            obtenerDispositivos().then(dispositivos => {
                const dispositivosDeVideo = [];
                dispositivos.forEach(function(dispositivo) {
                    const tipo = dispositivo.kind;
                    if (tipo === "videoinput") {
                        dispositivosDeVideo.push(dispositivo);
                    }
                });
                
                if (dispositivosDeVideo.length > 0) {
                    var ncam=cam+1;
                    mostrarStream(dispositivosDeVideo[cam].deviceId);
                    var eleccion="Cambiando a camara "+ncam;
                    id=dispositivosDeVideo[cam].deviceId;
                    sound();
                    speechSynthesis.speak(new SpeechSynthesisUtterance(eleccion));
                }
            });
            
            const mostrarStream = idDeDispositivo => {
                _getUserMedia({
                        video: {
                            // Justo aquí indicamos cuál dispositivo usar
                            deviceId: idDeDispositivo,
                        }
                    },
                    (streamObtenido) => {
                        () => {
                            // Detener el stream
                            if (stream) {
                                stream.getTracks().forEach(function(track) {
                                    track.stop();
                                });
                            }
                            // Mostrar el nuevo stream con el dispositivo seleccionado
                            mostrarStream(id);
                        }
        
                        // Simple asignación
                        stream = streamObtenido;
        
                        // Mandamos el stream de la cámara al elemento de vídeo
                        $video.srcObject = stream;
                        $video.play();
                    }, (error) => {
                        console.log("Error: "+error);
                    });
            }
        })();
    },
}
 annyang.addCommands(comandos);

    annyang.addCallback("result", frases => {
        //loguearVozDetectada(`<strong>Probablemente has dicho: </strong> <br> ${frases.join("<br>")}`);
    });

    annyang.start();
})
function sound(){
    if ( 'speechSynthesis' in window ) {
        speechSynthesis.cancel(); 
        speechSynthesis.getVoices();
    }
}
function foto(){
    $.getScript("scripts/foto.js");
}