const edades = new Map();

// Agregar nombres y edades
edades.set('Juan', 30);
edades.set('Ana', 25);
edades.set('Pedro', 35);

// Actualizar la edad de Ana
edades.set('Ana', 26);

// Imprimir todas las edades
edades.forEach(function (edad, nombre) {
  console.log(`${nombre}: ${edad} años`);
});
