const $inicio=document.getElementById("iniciar");
$inicio.addEventListener("click", function() {
$('#iniciar').hide();
var texto="Hola, bienvenido a see again! Para iniciar diga ¡Hacer Seguimiento! o si desea saber otras funciones diga ¡Comandos!"
if ( 'speechSynthesis' in window ) {
  speechSynthesis.cancel();
  speechSynthesis.getVoices();
}
speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
})