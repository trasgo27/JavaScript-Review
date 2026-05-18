let datos = [
  { nombre: 'Nacho', telefono: '966112233', edad: 40 },
  { nombre: 'Ana', telefono: '911223344', edad: 35 },
  { nombre: 'Mario', telefono: '611998877', edad: 15 },
  { nombre: 'Laura', telefono: '633663366', edad: 17 },
];

// 2. añadir dos elementos más
let e1 = { nombre: 'Pedro', telefono: '611944444', edad: 25 };
datos.push(e1);
//también se puede hacer directamente
datos.push({ nombre: 'Julia', telefono: '633232323', edad: 37 });
// 3. comprobar resultado
console.log('Añadir dos más');
console.log(datos);
// 4. ordenar por edad
datos.sort(function (a, b) {
  return a.edad - b.edad;
});
console.log('Orden por edad');
console.log(datos);
// 5. ordenar por nombre
datos.sort(function (a, b) {
  if (a.nombre < b.nombre) return -1;
  if (a.nombre > b.nombre) return 1;
  return 0;
});
console.log('Orden por nombre');
console.log(datos);
// 6. mayores de 30 años
let menores = datos.filter(function (persona) {
  return persona.edad >= 30;
});
console.log('Mayores de 30');
console.log(menores);
