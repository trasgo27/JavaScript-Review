// Programa principal
// Demana permís a l'usuari per a notificar i després inicia
// la cuenta atrás de 5 segundos
let permiso = Notification.permission;
if (permiso == 'default') {
  Notification.requestPermission().then((resp) => {
    if (resp == 'granted') {
      cuenta(5, 1000);
    }
  });
} else if (permiso == 'granted') {
  cuenta(5, 1000);
}

/**
 * Timeout que devuelve una promesa
 */
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Muestra la notificacion
 */
function mostrarNotificacion() {
  let n = new Notification('Información', {
    body: 'Se ha publicado un video nuevo',
  });
  n.addEventListener('click', (ev) => {
    window.open('http://localhost:5500/p1-video.html');
  });
}

/**
 * Para pintar en pantalla la cuenta atrás y cuando acabe mostrar la notificación
 */
async function cuenta(tiempo, interval) {
  while (tiempo >= 0) {
    await timeout(interval);
    document.body.innerHTML = tiempo--;
  }
  mostrarNotificacion();
}
