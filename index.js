let secuenciaCompu = [];
let secuenciaUsuario = [];
const $ronda = document.querySelector('#ronda');
let ronda = 0;
const $estado = document.querySelector('#estado');
const $botonComenzar = document.querySelector('#comenzar');
const COLORES = ['rojo','naranja','azul','verde'];

reiniciarJuego()

document.querySelector('#comenzar').addEventListener('click', function(){
  $botonComenzar.style.display = 'none';
  manejarSeleccionMaquina();
});

function resaltarCuadro(color){
  const DELEY_IN_MS = 500;
  const $cuadro = document.querySelector('.' + color);
  $cuadro.classList.add('activo');
  setTimeout(() => {
    $cuadro.classList.remove('activo');
  }, DELEY_IN_MS);
}

function manejarSeleccionMaquina(){
  actualizarEstado('Turno de la maquina');
  actualizarTurno("Turno de la máquina 🤖");
  bloquearUsuario();
  incrementarRonda();
  const color = elegirColorAleatorio(COLORES);
  secuenciaCompu.push(color);
  for(let i=0; i<secuenciaCompu.length; i++){
    setTimeout(function(){
      resaltarCuadro(secuenciaCompu[i]);
    },1000*(i+1));
  }
  setTimeout(function(){
    desbloquerUsuario();
    actualizarEstado('Turno del Usuario');
    actualizarTurno("¡Tu turno! 🚀");
  },1000 * secuenciaCompu.length +500);
  console.log('maquina', color);
}

function manejarSeleccionUsuario(color){
  secuenciaUsuario.push(color);
  console.log('usuario', color);
  resaltarCuadro(color);
  if (color !== secuenciaCompu[secuenciaUsuario.length - 1]) {
    console.log('perdiste');
    reiniciarJuego(true);
    return;
  }
  if(secuenciaUsuario.length === secuenciaCompu.length){
    console.log('turno maquina');
    secuenciaUsuario=[];
    manejarSeleccionMaquina();
  }
}

function elegirColorAleatorio(colores){
  const indiceColorAleatorio= Math.floor(Math.random()*colores.length);
  return colores[indiceColorAleatorio];
}

function desbloquerUsuario(){
  const $colores = document.querySelectorAll('.color');
  for (let i = 0; i<$colores.length; i++){
    const $color = $colores[i];
    $color.onclick = function(){
      const color = this.dataset.color;
      manejarSeleccionUsuario(color);
    };
  }
}

function bloquearUsuario (){
  const $colores = document.querySelectorAll('.color');
  for (let i = 0; i<$colores.length; i++){
    const $color = $colores[i];
    $color.onclick = function(){};
  }
}

function incrementarRonda(){
  $ronda.textContent=++ronda;
}

function reIniciarRonda(){
  ronda = 0;
  $ronda.textContent=0;
}

function reiniciarJuego(usuarioPerdio = false){
  bloquearUsuario();
  if(usuarioPerdio){
    actualizarEstado('Perdiste!, Toca "Comenzar" para reiniciar el juego');
  } else {
    actualizarEstado('Toca "Comenzar" para iniciar el juego');
  }
  actualizarTurno("Esperando para comenzar...");
  secuenciaCompu = [];
  secuenciaUsuario = [];
  reIniciarRonda();
  $botonComenzar.style.display = 'inline-block';
}

function actualizarEstado(estado){
  $estado.textContent = estado;
}

function actualizarTurno(texto) {
  const $turno = document.querySelector('#turno');
  $turno.textContent = texto;
  $turno.classList.remove('turno-maquina', 'turno-usuario');
  if (texto.includes("máquina")) {
    $turno.classList.add('turno-maquina');
  } else if (texto.includes("turno") || texto.includes("Tu turno")) {
    $turno.classList.add('turno-usuario');
  }
}

document.querySelector('#toggle-tema').addEventListener('click', function() {
  document.body.classList.toggle('tema-oscuro');
});
