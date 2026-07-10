//DOM
const listaMostrar = document.getElementById('lista-libros');
const categoria = document.getElementById('categoria');
const miTemporizador = document.getElementById('temporizador');
//variables Universales
const libros = [];
let contador = 0;
let temporizador = null;
//funcionalidades
function mostrar(valor) {
  const librosFiltrados =
    !valor || valor === 'todos'
      ? libros
      : libros.filter((l) => l.genero === valor);
  //mostrar
  const html = librosFiltrados
    .map(
      (libro) =>
        `<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`,
    )
    .join(''); //Se mostraba correcto, no? No habian , fantasma ...debug5
  listaMostrar.innerHTML = html;
}
//temporizador
function iniciarTempo() {  
  temporizador = setInterval(()=>{
      contador +=1;
      miTemporizador.innerHTML = contador;
  }, 100);  
}


//Cargar de forma ASINCRONA
//async, await, try, catch
//promise, then, catch
//fetch crea un promesa la recoges con then catch o hace recarga asincrona

function cargar() {
  return fetch('libros.json');
}

function reiniciar(){
  //DEBUG: falta reiniciar contador = 0 y actualizar el span del temporizador
  contador = 0;
  clearInterval(temporizador);
  temporizador = setInterval(()=>{
    contador +=1;
    miTemporizador.innerText = contador;
  },100);
  //DEBUG: falta categoria.value = 'todos' + mostrar('todos') para restaurar lista
  //borrar el select
  const categoria = document.getElementById('categoria');
  if(categoria){
    categoria.value = 'todos';
  }
  mostrar('todos');
  //reiniciar temporizado

  //iniciarTempo(); 
  //borrar la cookie
  document.cookie = "genero=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

//Evento
document.addEventListener('DOMContentLoaded', (e) => {
  //    libros = cargar() una constante no se puede reasignar
  cargar()
    .then((resp) => {
      if (!resp.ok) {
        //resp.ok memoria
        throw new Error();
      } else {
        return resp.json();
      }
    })
    //.then((resp)=> libros.push(resp)) con esto se añade IMPORTANTE
    .then((resp) => {
    //punto 2 Extraer los generos Unicos
      console.table(`Hola: ${libros}`);
      libros.push(...resp);
      const generos = [...new Set(libros.map((libro) => libro.genero))];
      console.table(`Los generos son: ${generos}`);
      const html = generos
        .map((genero) => {
          return `<option value="${genero}">${genero}</option>`;
        })
        .join('');
      categoria.innerHTML =
        `<option value="todos">Todos los generos</option>` + html;
      iniciarTempo();//iniciarTempo al cargar pagina, ok?
      //cargar el genero de la cookie
      const generoGuardado = document.cookie.split('; ').filter((item)=>
      item.startsWith('genero='));//genero=Novela
      if(generoGuardado.length >0){
        categoria.value = decodeURIComponent(generoGuardado[0].split('=')[1]);
        mostrar(categoria.value); //categoriaValor tb funciona
        
      }else{
        mostrar('todos');
      }
      //aplicar borrar
      const miReiniciar = document.getElementById('reiniciar');
      miReiniciar.addEventListener('click',(e)=>{
        reiniciar();
      });      
      console.log(`Genero guardado ${generoGuardado}`);

    })
    .catch((err) => {
      console.error('Ha habido Error', err);
    });
});
//Evento cambiar el select
categoria.addEventListener('change', (e) => {
  const genero = e.target.value;
  mostrar(genero);
  //generar cookie
  let expiracion = new Date();
  expiracion.setTime(expiracion.getTime() + 30 * 24 * 60 * 60 * 1000);
  document.cookie = `genero=${encodeURIComponent(genero)}; expires=${expiracion.toUTCString()}; path=/`;
});


