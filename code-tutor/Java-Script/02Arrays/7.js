function generarCombinacionesLoteria() {
  const totalCombinaciones = 50;

  for (let i = 0; i < totalCombinaciones; i++) {
    const combinacion = new Set();
    while (combinacion.size < 6) {
      const numero = Math.floor(Math.random() * 49) + 1;
      combinacion.add(numero);
    }

    // Mostramos la combinación por consola
    console.log('Combinación ' + (i + 1) + ': ' + [...combinacion]);
  }
}

generarCombinacionesLoteria();
