// Programa principal

let vd = document.querySelector('video');
let info = document.querySelector('span');
vd.play();

// Stop/Start en cada click con el botón izquierdo
vd.addEventListener('click', (ev) => {
  if (vd.paused) vd.play();
  else vd.pause();
});

// Mostrar la duración del video con el botón derecho
vd.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();

  info.innerHTML =
    'Duracion: ' +
    parseInt(vd.duration / 60) +
    ':' +
    parseInt(vd.duration % 60);
});
