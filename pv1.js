const axios=require('axios');
var foto=[]
foto[0]="https://ichi.pro/assets/images/max/724/1*opyqYBXzkTUYIzf2_R-pKA.png";
foto[1]="http://shooterfiles.com/wp-content/uploads/2018/02/Almaty-Blog-39.jpg";
foto[2]="https://3.bp.blogspot.com/-iGsSoxv7uZ0/VeU0nCGuW_I/AAAAAAAAE_0/ThQuCc_icFE/s1600/aus.noche%2B09.M2.jpg";
foto[3]="https://static.vecteezy.com/system/resources/previews/001/400/379/non_2x/lightning-strike-over-empty-street-in-prague-photo.jpg";
foto[4]="https://rolland.com.mx/wp-content/uploads/2019/01/shutterstock_1213159048.jpg";

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
function imprimeDatos(informacionFoto,numFoto) { 
    var j=0;
    //console.log(informacionFoto['Informacion'].objects.length);
    //Funciona :D
    var posicionIzquierda=informacionFoto['Informacion'].metadata.width/3;
    var posicionCentro=posicionIzquierda*2;
    //var tamaño=informacionFoto['Informacion'].metadata.height;
    var lejos=informacionFoto['Informacion'].metadata.height/9;
    var intermedio=lejos*3;
    var cerca=lejos*5;
    var frente=lejos*7;
    console.log("Foto numero: "+numFoto);
    //console.log(proximidad,cercano,pocoLejos,lejano);
    //console.log("Max Izquierda:"+posicionIzquierda+'\n'+"Max Centro: "+posicionCentro+'\n'+"Max Derecha: "+posicionDerecha);
    //console.log(informacionFoto['Informacion'].objects.length);
    if(informacionFoto['Informacion'].objects.length!=0){
    do{
        //Punto de origen x
        var x=informacionFoto['Informacion'].objects[j].rectangle.x;
        //Punto final de x
        var w=informacionFoto['Informacion'].objects[j].rectangle.w;
        //Punto de origen y
        //var y=informacionFoto['Informacion'].objects[j].rectangle.y;
        //Punto final de dimension de largo
        var h=informacionFoto['Informacion'].objects[j].rectangle.h;
        var puntox=x+w;//x+w;
        //var puntoy=y+h;
        switch(informacionFoto['Informacion'].objects[j].object){
            case '':
                console.log("Esta despejado");
                break;
            case 'car':
                //Posicion
                if(puntox>=0&&puntox<posicionIzquierda){
                    console.log("¡Cuidado! Hay un carro en la izquierda");
                }else if(puntox>=posicionIzquierda&&puntox<posicionCentro){
                    console.log("¡Cuidado! Hay un carro en el centro");
                }else{
                    console.log("¡Cuidado! Hay un carro en la derecha");
                }
                //Proximidad
                if(h<lejos){
                    console.log("Esta muy lejos");
                }else if(h>=lejos&&h<intermedio){
                    console.log("Esta lejos");
                }else if(h>=intermedio&&h<cerca){
                    console.log("Esta un poco lejos");
                }else if(h>=cerca&&h<frente){
                    console.log("Esta cercano a ti");
                }else{
                    console.log("Esta frente tuyo");
                }
                break;
            case 'person':
                if(puntox>=0&&puntox<posicionIzquierda){
                    console.log("Hay una persona en la izquierda");
                }else if(puntox>=posicionIzquierda&&puntox<posicionCentro){
                    console.log("Hay una persona en el centro");
                }else{
                    console.log("Hay una persona en derecha");
                }
                //Proximidad
                if(h<lejos){
                    console.log("Esta muy lejos");
                }else if(h>=lejos&&h<intermedio){
                    console.log("Esta lejos");
                }else if(h>=intermedio&&h<cerca){
                    console.log("Esta un poco lejos");
                }else if(h>=cerca&&h<frente){
                    console.log("Esta cercano a ti");
                }else{
                    console.log("Esta frente tuyo");
                }
                break;
            case 'tree':
                if(puntox>=0&&puntox<posicionIzquierda){
                    console.log("Hay un arbol en la izquierda");
                }else if(puntox>=posicionIzquierda&&puntox<posicionCentro){
                    console.log("Hay un arbol en el centro");
                }else{
                    console.log("Hay un arbol en el derecha");
                }
                    //Proximidad
                    if(h<lejos){
                    console.log("Esta muy lejos");
                }else if(h>=lejos&&h<intermedio){
                    console.log("Esta lejos");
                }else if(h>=intermedio&&h<cerca){
                    console.log("Esta un poco lejos");
                }else if(h>=cerca&&h<frente){
                    console.log("Esta cercano a ti");
                }else{
                    console.log("Esta frente tuyo");
                }
                break;
            case 'dog':
                if(puntox>=0&&puntox<posicionIzquierda){
                    console.log("Cuidado con el perro la izquierda");
                }else if(puntox>=posicionIzquierda&&puntox<posicionCentro){
                    console.log("Cuidado con el perro en el centro");
                }else{
                    console.log("Cuidado con el perro en la derecha");
                }
                    //Proximidad
                    if(h<lejos){
                    console.log("Esta muy lejos");
                }else if(h>=lejos&&h<intermedio){
                    console.log("Esta lejos");
                }else if(h>=intermedio&&h<cerca){
                    console.log("Esta a la mitad de cercas y lejos");
                }else if(h>=cerca&&h<frente){
                    console.log("Esta cercano a ti");
                }else{
                    console.log("Esta frente tuyo");
                }
                break;
        }
        j++;
    } while(j<informacionFoto['Informacion'].objects.length);
    }else{
        console.log("Esta despejado");
    }
    //console.log(informacionFoto['Informacion'].objects[0].object);
    
}
for(var i=0;i<5;i++){
    datos(i, imprimeDatos);
}