const libros = [];
const marcador = document.getElementById('lista-libros');
const select = document.getElementById('categoria');
const spanTemporizador = document.getElementById('temporizador');
let contador = 0;
let intervalo = null;

// --- Punto 4: Temporizador ---
function iniciarTemporizador(){
intervalo = setInterval(()=>{
    contador ++;
    spanTemporizador.textContent = contador;
    },100)
}

// --- Punto 3: Cookies ---
function guardarCookie(genero) {
  document.cookie = `genero=${encodeURIComponent(genero)}; path=/; max-age=86400`;
}

function leerCookie() {
  const cookies = document.cookie.split('; ').find(item => item.startsWith('genero='));
  return cookies ? decodeURIComponent(cookies.split('=')[1]) : '';
}

// --- Punto 6: Promesa del autor ---
function obtenerAutor(libro) {
  return new Promise(resolve => {
    setTimeout(() => resolve(libro.autor), 300);
  });
}

// --- Punto 2: Filtro ---
function dibujar(genero) {
  marcador.innerHTML = "";
  const filtrados = genero && genero !== 'todos'
    ? libros.filter(l => l.genero.toLowerCase() === genero)
    : libros;
  filtrados.forEach((libro, ind) => {
    const li = document.createElement('li');
    li.dataset.id = libro.id;
    li.innerHTML = `${ind + 1}.- ${libro.titulo} <span id="autor-${libro.id}"></span>`;
    li.addEventListener('mouseenter', async () => {
      const span = document.getElementById(`autor-${libro.id}`);
      if (!span.textContent) {
        span.textContent = await obtenerAutor(libro);
      }
    });
    marcador.appendChild(li);
  });
}

// --- Punto 1: Carga inicial + Punto 3: Restaurar cookie ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('libros.json');
    const data = await res.json();
    libros.push(...data);

    const generos = [...new Set(libros.map(l => l.genero))];
    select.innerHTML = '<option value="todos">Todos los géneros</option>' +
      generos.map(g => `<option value="${g.toLowerCase()}">${g}</option>`).join('');

    const generoGuardado = leerCookie();
    select.value = generoGuardado || 'todos';
    dibujar(select.value);

    select.addEventListener('change', () => {
      dibujar(select.value);
      guardarCookie(select.value);
    });

    iniciarTemporizador();
  } catch (err) {
    console.error('Error al cargar los libros:', err);
  }
});

// --- Punto 5: Reiniciar ---
document.getElementById('reiniciar').addEventListener('click', () => {
  document.cookie = 'genero=; path=/; max-age=0';
  clearInterval(intervalo);
  contador = 0;
  spanTemporizador.textContent = '0';
  select.value = 'todos';
  dibujar('todos');
  iniciarTemporizador();
});
