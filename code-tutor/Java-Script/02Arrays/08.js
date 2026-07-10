function calcularFrecuencias() {
  const frecuencias = new Map();

  // Inicializamos el mapa con los números del 1 al 10 en 0
  for (let i = 1; i <= 10; i++) {
    frecuencias.set(i, 0);
  }

  // Generamos 10,000 números aleatorios entre 1 y 10 y actualizamos sus frecuencias
  for (let i = 0; i < 10000; i++) {
    const numero = Math.floor(Math.random() * 10) + 1;
    frecuencias.set(numero, frecuencias.get(numero) + 1);
  }

  // Mostramos las frecuencias
  console.log('Frecuencias:');
  frecuencias.forEach(function (valor, clave) {
    console.log(`Número ${clave}: ${valor}`);
  });
}

calcularFrecuencias();
