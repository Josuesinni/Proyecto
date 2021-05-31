const obtenerDispositivos = () => navigator
.mediaDevices
.enumerateDevices();
obtenerDispositivos()
.then(dispositivos => {
    // Vamos a filtrarlos y guardar aquí los de vídeo
    const dispositivosDeVideo = [];
    
    // Recorrer y filtrar
    dispositivos.forEach(function(dispositivo) {
        const tipo = dispositivo.kind;
        if (tipo === "videoinput") {
            dispositivosDeVideo.push(dispositivo);
        }
    });

    if (dispositivosDeVideo.length > 0) {
        var a=0;
        var b=1;
        var nombreDispositivo=["Camaras disponibles: "+dispositivosDeVideo.length+"."];
        do{
            nombreDispositivo.push("Camara "+b+": "+dispositivosDeVideo[a].label);
            a++;
            b++;
        }while(dispositivosDeVideo.length>a);
        sound();
        const text = nombreDispositivo
        const synth = window.speechSynthesis 
        const utterThis = new SpeechSynthesisUtterance(text) 
        utterThis.rate = 0.8
        synth.speak(utterThis)
        //speechSynthesis.speak(new SpeechSynthesisUtterance(nombreDispositivo));
    }
});