// Solución:
let paises = ['España', 'Francia', 'Alemania', 'Italia'];

// Recorrer con for...of
for (let pais of paises) {
  console.log(pais); // Imprime: "España", "Francia", "Alemania", "Italia"
}

// Eliminar el primer país
delete paises[0];
//paises.shift();

// Recorrer nuevamente
for (let pais of paises) {
  console.log(pais); // Imprime: "Francia", "Alemania", "Italia"
}
