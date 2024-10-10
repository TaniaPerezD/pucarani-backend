
const jugador = document.getElementById("jugador");
const laberinto = document.getElementById("laberinto");
const metas = document.querySelectorAll(".meta");
const ucb = document.querySelectorAll(".ucb");
const paredes = document.querySelectorAll(".pared");
const puertas = document.querySelectorAll(".puerta"); 
const enemigo = document.getElementById("enemigo");
const enemigos = [
  { elemento: document.getElementById("enemigo1"), pos: { x: 100, y: 190 }, velocidad: 4, direccion: 1, limiteIzq: 0, limiteDer: 300, tipo: 'horizontal' },
  { elemento: document.getElementById("enemigo2"), pos: { x: 765, y: 200 }, velocidad: 5, direccion: 1, limiteArriba: 0, limiteAbajo: 400, tipo: 'vertical' },
  { elemento: document.getElementById("enemigo3"), pos: { x: 700, y: 550 }, velocidad: 8, direccion: 1, limiteIzq: 400, limiteDer: 900, tipo: 'horizontal' },
  { elemento: document.getElementById("enemigo4"),pos: { x: 10, y: 700 }, velocidad: 5, direccion: 1, limiteArriba: 650, limiteAbajo: 950, tipo: 'vertical' },
  { elemento: document.getElementById("enemigo5"), pos: { x: 230, y: 950 }, velocidad: 5, direccion: 1, limiteArriba: 650, limiteAbajo: 950, tipo: 'vertical' },
  { elemento: document.getElementById("enemigo6"), pos: { x: 900, y: 750 }, velocidad: 8, direccion: 1, limiteIzq: 600, limiteDer: 900, tipo: 'horizontal' },
];
let direction = 'stationary';  // para saber la dirección del jugador, es stationario porque no se mueve al inicio
let jugadorPos = { x: 10, y: 10 };  // Posición inicial del jugador
const velocidad = 6;  // Velocidad del movimiento
let estrellas = 3; // Agregamos premios al jugador
let estrellasRecolectadas = 0;  // Contador de estrellas recolectadas
const estrellasNecesarias = 5; 
// Obtener elementos de los modales
const modalInicio = document.getElementById("modal-inicio");
const modalPerdida = document.getElementById("modal-perdida");
const modalVictoria = document.getElementById("modal-victoria");
const modalEsc = document.getElementById("modal-escape");
var audioFondo = document.getElementById("musicaFondo");
var audioperdida = document.getElementById("musicaperdida");
var audiogana = document.getElementById("musicagana");
let diploma = false;
  audioFondo.volume = 0.1; 
  audioperdida.volume= 0.1;
  audiogana.volume= 1; 
const comenzarBtn = document.getElementById("comenzar-btn");
const cerrarmenuBtn = document.getElementById("salirmenu-btn");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const reiniciarBtnper = document.getElementById("reiniciar-btnperdida");

const cerrarBtn = document.getElementById("cerrar-btn");
const estrellasContenedor = document.getElementById("estrellas-contenedor");
const estrellasRecolectadasSpan = document.getElementById("estrellas-recolectadas"); // Cantidad de estrellas necesarias para abrir la puerta
document.addEventListener("keydown", moverJugador);
reiniciarBtnper.addEventListener("click", reiniciarJuego);
// Evento para el botón "Comenzar"
comenzarBtn.addEventListener("click", comenzarJuego);
cerrarmenuBtn.addEventListener("click", cerrarmenu);

// Evento para el botón "Reiniciar"
reiniciarBtn.addEventListener("click", reiniciarJuego);

// Evento para el botón "Cerrar"
cerrarBtn.addEventListener("click", () => {
  modalVictoria.style.display = "none"; // Oculta el modal de victoria
  reiniciarJuego(); // Reinicia el juego
});

// Mostrar el modal de inicio al cargar la página
window.onload = mostrarModalInicio;
function moverJugador(event) {
  switch (event.key) {
    case "ArrowUp":
        direction = 'up';
      jugadorPos.y -= velocidad;
      break;
    case "ArrowDown":
        direction = 'down';
      jugadorPos.y += velocidad;
      break;    
    case "ArrowLeft":
        direction = 'left';
      jugadorPos.x -= velocidad;
      break;
    case "ArrowRight":
        direction = 'right';
      jugadorPos.x += velocidad;
      break;
    case "Escape":
      mostrarModalEsc();
      break;
      

  }
  if (direction === 'left'& diploma == false) {
    jugador.style.backgroundImage = "url('https://i.postimg.cc/g0gbQ26w/shibaizq.gif')"; // Imagen hacia la izquierda
  } else if (direction === 'right' & diploma == false)  {
    jugador.style.backgroundImage = "url('https://i.postimg.cc/6q2tx2kj/shibaderechita.gif')"; // Imagen hacia la derecha
  }
  else if (direction === 'right' & diploma == true)  {
    jugador.style.backgroundImage = "url('https://i.postimg.cc/P5ZM4DY0/shibaderdip.gif')"; // Imagen hacia la derecha
  }
  else if (direction === 'left' & diploma == true)  {
    jugador.style.backgroundImage = "url('https://i.postimg.cc/7hnVgGcS/shibaizqdip.gif')"; // Imagen hacia la derecha
  }
  
  actualizarPosicion();
 
  comprobarColisiones();
  moverCamara();
  iluminarParedes();
}

// Función para mostrar el modal de inicio
function mostrarModalInicio() {
  modalInicio.style.display = "flex"; // Muestra el modal de inicio
}

// Función para ocultar el modal de inicio y comenzar el juego
function comenzarJuego() {
  modalInicio.style.display = "none"; // Oculta el modal de inicio
  // Iniciar el juego aquí (por ejemplo, llamando a funciones necesarias)
}

// Función para mostrar el modal de perdida
function mostrarModalPerdida() {
  modalPerdida.style.display = "flex";
  audioperdida.play()
  audioFondo.pause()
   // Muestra el modal de perdida
}

function mostrarModalEsc() {
  modalEsc.style.display = "flex"; // Muestra el modal de perdida
}

function cerrarmenu() {
  modalEsc.style.display = "none"; // Muestra el modal de perdida
}

function actualizarPosicion() {
  jugador.style.top = `${jugadorPos.y}px`;
  jugador.style.left = `${jugadorPos.x}px`;
  // Calcular la posición de la linterna
  linterna.style.top = `${jugadorPos.y - (linterna.offsetHeight / 2) + (jugador.offsetHeight / 2)}px`;
  linterna.style.left = `${jugadorPos.x - (linterna.offsetWidth / 2) + (jugador.offsetWidth / 2)}px`;
  estrellasContenedor.style.top = `${jugadorPos.y}px`;
  estrellasContenedor.style.left = `${jugadorPos.x - (linterna.offsetWidth / 2) + (jugador.offsetWidth / 2)}px`;;
}
function moverEnemigos() {
  enemigos.forEach(en => {
    if (en.tipo === 'horizontal') {
      // Mueve el enemigo horizontalmente
      en.pos.x += en.velocidad * en.direccion;

      // Cambia la dirección si alcanza los límites
      if (en.pos.x > en.limiteDer || en.pos.x < en.limiteIzq) {
        en.direccion *= -1; // Cambia la dirección
      }

      // Actualiza la posición del enemigo en el DOM
      en.elemento.style.left = `${en.pos.x}px`;
      en.elemento.style.top = `${en.pos.y}px`;

    } else if (en.tipo === 'vertical') {
      // Mueve el enemigo verticalmente
      en.pos.y += en.velocidad * en.direccion;

      // Cambia la dirección si alcanza los límites
      if (en.pos.y > en.limiteAbajo || en.pos.y < en.limiteArriba) {
        en.direccion *= -1; // Cambia la dirección
      }

      // Actualiza la posición del enemigo en el DOM
      en.elemento.style.left = `${en.pos.x}px`;
      en.elemento.style.top = `${en.pos.y}px`;
    }

    comprobarColisionConEnemigo(en.elemento);
  });
}

function recolectarEstrella(meta) {
  meta.style.display = 'none'; // Ocultar la estrella recolectada
  estrellasRecolectadas += 1; // Incrementar contador de estrellas
  estrellasRecolectadasSpan.textContent = estrellasRecolectadas; // Actualizar visualmente
  
  const estrellasRestantes = estrellasNecesarias - estrellasRecolectadas; // Calcular cuántas faltan

  // Mostrar mensaje por cada estrella recolectada con el progreso
  Swal.fire({
    title: '¡Felicidades!',
    text: `Has recolectado ${estrellasRecolectadas}. Te faltan ${estrellasRestantes} estrella(s).`,
    icon: 'success',
    timer: 1800, // Duración del mensaje
    showConfirmButton: false // No mostrar botón de confirmación
  });

  // Verificar si se han recolectado las estrellas necesarias
  if (estrellasRecolectadas >= estrellasNecesarias) {
    Swal.fire('¡Felicidades!', 'Has recolectado todas las estrellas necesarias.', 'success');
  }
}

function recolectarUCB(ucb) {
  ucb.style.display = 'none'; // Ocultar la estrella recolectada
  diploma = true;

  // Mostrar mensaje por cada estrella recolectada con el progreso
  Swal.fire({
    title: '¡Felicidades!',
    text: `Haz encontrado una Insignia UCB.`,
    icon: 'success',
    timer: 1800, // Duración del mensaje
    showConfirmButton: false // No mostrar botón de confirmación
  });

}

function comprobarColisionConEnemigo(enemigoElemento) {
  const enemigoRect = enemigoElemento.getBoundingClientRect();
  const jugadorRect = jugador.getBoundingClientRect();

  if (
    jugadorRect.left < enemigoRect.right &&
    jugadorRect.right > enemigoRect.left &&
    jugadorRect.top < enemigoRect.bottom &&
    jugadorRect.bottom > enemigoRect.top
  ) {
    mostrarModalPerdida()
  }
}
function verificarPuerta() {
  if (estrellasRecolectadas >= estrellasNecesarias) {
    // Si el jugador tiene suficientes estrellas, permite abrir la puerta
    puertas.forEach((puerta) => {
      puerta.style.backgroundImage = "url('https://i.postimg.cc/ZR2PgT5n/door-open.png')"; // Cambia la imagen a puerta abierta
    });
  }
}
// Llama a moverEnemigo cada cierto tiempo para simular el movimiento
setInterval(moverEnemigos, 100);
function moverCamara() {
    
    const escala = 2.5; 

   
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

   
    const centroX = (anchoVentana / 2) - (jugadorPos.x * escala) - (jugador.offsetWidth / 2) * escala;
    const centroY = (altoVentana / 2) - (jugadorPos.y * escala) - (jugador.offsetHeight / 2) * escala;

   
    laberinto.style.transformOrigin = "top left"; 
    laberinto.style.transform = `scale(${escala}) translate(${centroX / escala}px, ${centroY / escala}px)`;
}

function iluminarParedes() {
    paredes.forEach((pared) => {
      const paredRect = pared.getBoundingClientRect();
      const distancia = calcularDistancia(jugadorPos.x + jugador.offsetWidth / 2, jugadorPos.y + jugador.offsetHeight / 2, paredRect.left + paredRect.width / 2, paredRect.top + paredRect.height / 2);
      
      // a mayor distancia, menor el brillo
      const maxDistancia = 200; // Distancia máxima para el brillo completo
      const brillo = Math.max(0, maxDistancia - distancia) / maxDistancia;
  
      pared.style.boxShadow = `0 0 ${20 * brillo}px ${20 * brillo}px rgba(255, 255, 0, ${brillo})`;  // Ajusta el brillo de las paredes
    });
  }
  function calcularDistancia(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }  

  function comprobarColisiones() {
    const jugadorRect = jugador.getBoundingClientRect();
    const offset = 10; // Ajusta este valor para hacer más pequeña el área de colisión
    const colisionRect = {
      left: jugadorRect.left + offset,
      right: jugadorRect.right - offset,
      top: jugadorRect.top + offset,
      bottom: jugadorRect.bottom - offset,
    };
  
    paredes.forEach((pared) => {
      const paredRect = pared.getBoundingClientRect();
      if (
        colisionRect.left < paredRect.right &&
        colisionRect.right > paredRect.left &&
        colisionRect.top < paredRect.bottom &&
        colisionRect.bottom > paredRect.top
      ) {
        if (event.key === "ArrowUp") jugadorPos.y += velocidad;
        if (event.key === "ArrowDown") jugadorPos.y -= velocidad;
        if (event.key === "ArrowLeft") jugadorPos.x += velocidad;
        if (event.key === "ArrowRight") jugadorPos.x -= velocidad;
        actualizarPosicion();
        moverCamara();
        iluminarParedes();
      }
    });
  
    //estrellas
    metas.forEach((meta) => {
      const metaRect = meta.getBoundingClientRect();
      if (
        jugadorRect.left < metaRect.right &&
        jugadorRect.right > metaRect.left &&
        jugadorRect.top < metaRect.bottom &&
        jugadorRect.bottom > metaRect.top
      ) {
        recolectarEstrella(meta);
      }
    });
     //ucb
     ucb.forEach((ucb) => {
      const ucbRect = ucb.getBoundingClientRect();
      if (
        jugadorRect.left < ucbRect.right &&
        jugadorRect.right > ucbRect.left &&
        jugadorRect.top < ucbRect.bottom &&
        jugadorRect.bottom > ucbRect.top
      ) {
        recolectarUCB(ucb);
      }
    });
 // Colisión con la puerta
 puertas.forEach((puerta) => {
  const puertaRect = puerta.getBoundingClientRect();
  if (
    jugadorRect.left < puertaRect.right &&
    jugadorRect.right > puertaRect.left &&
    jugadorRect.top < puertaRect.bottom &&
    jugadorRect.bottom > puertaRect.top
  ) {
    if (estrellasRecolectadas >= estrellasNecesarias) {
      // Mostrar mensaje con Swal
      mostrarModalVictoria()
    } else {
      // Alejar al jugador un poco de la puerta y mostrar Swal
      jugadorPos.x -= 50; // Alejar al jugador de la puerta
      actualizarPosicion();

      Swal.fire({
        icon: 'warning',
        title: 'Puerta cerrada',
        text: 'Estrellas insuficientes. Necesitas más estrellas para abrir la puerta. ',
        
        confirmButtonText: 'OK'
      });
    }
  }
});
  }
function mostrarModalVictoria() {
  modalVictoria.style.display = "flex"; // Muestra el modal de victoria
  audiogana.play()
  audioFondo.pause()
}
function reiniciarJuego() {
  modalPerdida.style.display = "none"; 
  location.reload();
}
