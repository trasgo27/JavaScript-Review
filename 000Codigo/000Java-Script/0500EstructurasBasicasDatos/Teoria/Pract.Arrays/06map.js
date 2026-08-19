//Map almacena nombre como clave edad valor
const miMap = new Map();
miMap.set('Salva',54);
miMap.set('Sandra',54);
miMap.set('Elena',9);
miMap.set('Laura',12);
//Valores Iniciales
console.log("Valores Iniciales");
console.log(miMap);

//actualizar la edad de uno
console.log("Actualizar Sandra");
miMap.set('Sandra',50);
//Imprimir
console.log(miMap);
console.table(miMap);
//forEach()
miMap.forEach(function (edad, nombre){
    console.log(`La Edad: ${edad} es la de: ${nombre}`);
});

