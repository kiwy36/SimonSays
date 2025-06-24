let secuenciaCompu = [];
let secuenciaUsuario = [];
const $ronda = document.querySelector('#ronda');
let ronda = 0;
const $estado = document.querySelector('#estado');
const COLORES = ['rojo','naranja','azul','verde'];
reiniciarJuego()
//funcion que imprime el color elegido por la maquina
document.querySelector('#comenzar').addEventListener('click', function(){
  manejarSeleccionMaquina()
});
//funcion para resaltar cuadro
function resaltarCuadro(color){
  const DELEY_IN_MS = 500;
  document.querySelector('.' + color).style.opacity= 1;
  setTimeout(function(){
  document.querySelector('.' + color).style.opacity= 0.5;
  },DELEY_IN_MS)
}
//funcion manejar funcion maquina
function manejarSeleccionMaquina(){
  actualizarEstado('Turno de la maquina')
  bloquearUsuario()
  incrementarRonda()
  const color = elegirColorAleatorio(COLORES);
  secuenciaCompu.push(color);
  for(let i=0; i<secuenciaCompu.length; i++){
    setTimeout(function(){
      resaltarCuadro(secuenciaCompu[i])
    },1000*(i+1))
  }
  setTimeout(function(){
    desbloquerUsuario()
    actualizarEstado('Turno del Usuario')
  },1000 * secuenciaCompu.length +500)
  console.log('maquina', color);
}
/////////////////////////////
function manejarSeleccionUsuario(color){
  secuenciaUsuario.push(color)
  console.log('usuario', color);
  resaltarCuadro(color)
    //validacion comparativa de secuencia
    if (color !== secuenciaCompu[secuenciaUsuario.length - 1]) {
      console.log('perdiste');
      reiniciarJuego(true)
      return;
    }
    if(secuenciaUsuario.length === secuenciaCompu.length){
      console.log('turno maquina');
      secuenciaUsuario=[];
      manejarSeleccionMaquina()
    }
}
//funcion que hace elegir a la maquina un valor aleatorio
function elegirColorAleatorio(colores){
  const indiceColorAleatorio= Math.floor(Math.random()*colores.length);
  return colores[indiceColorAleatorio]
}
//toma los colores de los botones y los imprime en consola
function desbloquerUsuario(){
  const $colores = document.querySelectorAll('.color')
  for (let i = 0; i<$colores.length; i++){
    const $color = $colores[i];
    $color.onclick = function(){
      const color = this.dataset.color;
      manejarSeleccionUsuario(color)
    };
  }
}
function bloquearUsuario (){
  const $colores = document.querySelectorAll('.color')
  for (let i = 0; i<$colores.length; i++){
    const $color = $colores[i];
    $color.onclick = function(){};
  }
}
function incrementarRonda(){
  $ronda.textContent=++ronda
}
function reIniciarRonda(){
  ronda = 0;
  $ronda.textContent=0
}
function reiniciarJuego(usuarioPerdio = false){
  bloquearUsuario()
  if(usuarioPerdio){
    actualizarEstado('Perdiste!, Toca "Comenzar" para reiniciar el juego')
  }else{
    actualizarEstado('Toca "Comenzar" para iniciar el juego')
  }
  secuenciaCompu = [];
  secuenciaUsuario = [];
  reIniciarRonda()
}
function actualizarEstado(estado){
  $estado.textContent = estado;
}