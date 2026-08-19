console.log('=== Ejercicio 04: Debugging async/await ===');

// ============================================================
// TAREA 1: Obtener usuario
// ============================================================
// BUG: Esta función crea una función async innecesaria y usa .then()
// CORRIGE: Usa await directamente dentro de obtenerDatos()

// ============================================================
// TAREA 2: Obtener albumes del usuario
// ============================================================
// BUG: Variable global accidentales y .then() anidados
// CORRIGE: Usa await y variables con const/let

// ============================================================
// TAREA 3: Obtener fotos del primer album
// ============================================================
// BUG: Está vacía. Debes implementarla con await

// ============================================================
// TAREA 4: Mostrar resumen
// ============================================================
// BUG: Las variables usuario y albumCount no existen en este scope
// CORRIGE: Declara las variables con const/let en el scope correcto

async function obtenerDatos() {
  // ── TAREA 1: Obtener usuario ──
  console.log('--- Tarea 1 ---');

  // 💡 Pista: Elimina la función fetchUsuario. Usa await directamente:
  //   const respUsuario = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //   const usuario = await respUsuario.json();
  //   console.log('Usuario:', usuario);

  /* Tu código aquí — reemplaza todo el bloque de TAREA 1 */
  const fetchUsuario = async () => {
    const r = await fetch('https://jsonplaceholder.typicode.com/users/1');
    return await r.json();
  };

  fetchUsuario().then((usuario) => {
    console.log('Usuario:', usuario);
  });

  // ── TAREA 2: Obtener albumes del usuario ──
  console.log('--- Tarea 2 ---');

  // 💡 Pista: Misma idea, await directo:
  //   const respAlbumes = await fetch('https://jsonplaceholder.typicode.com/albums?userId=' + usuario.id);
  //   const albumes = await respAlbumes.json();
  //   console.log('Albumes:', albumes);

  /* Tu código aquí — reemplaza todo el bloque de TAREA 2 */
  const albumes = async () => {
    const r = await fetch(
      'https://jsonplaceholder.typicode.com/albums?userId=1',
    );
    return (albumCount = await r.json());
  };

  albumes().then((lista) => {
    console.log('Albumes:', lista);
  });

  // ── TAREA 3: Obtener fotos del primer album ──
  console.log('--- Tarea 3 ---');

  // 💡 Pista: Primero obtén el primer album del array:
  //   const primerAlbum = albumes[0];
  // Luego haz fetch de sus fotos:
  //   const respFotos = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + primerAlbum.id);
  //   const fotos = await respFotos.json();
  //   console.log('Fotos del album "' + primerAlbum.title + '":', fotos);

  /* Tu código aquí — implementa la TAREA 3 completa */

  // ── TAREA 4: Mostrar resumen ──
  console.log('--- Tarea 4 ---');

  // 💡 Pista: Si declaraste usuario y albumes con const arriba,
  //   ahora puedes usarlos aquí directamente:
  //   console.log(usuario.name + ' tiene ' + albumes.length + ' albumes');

  /* Tu código aquí — reemplaza las variables rotas */
  console.log(usuario.name + ' tiene ' + albumCount.length + ' albumes');
}

obtenerDatos();
