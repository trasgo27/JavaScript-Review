const valores = [1,2,2,3,2,1,5,7,3,9];
//Set can create a Set from an Array
const unicos = new Set(valores);
//Backticks vs. Single quotes
//with the right one the $ sign and the curly braces change color
console.log(`valores: ${valores}`);
console.table(`valores: ${valores}`);

console.log(`unicos: ${unicos}`);
console.log("Sin Error");
console.log(unicos);
console.table(`unicos: ${unicos}`);
console.table("Backticks force Objects to Strings");
alert(`Un Set no se puede mostrar directamente hay que volver a transforma a vector`)
//set can not be shown directly
//valoresU
const valoresU = [...unicos];
console.log(`valoresU: ${valoresU}`);
console.table(`valoresU: ${valoresU}`);

//valoresU2
const valoresU2 = Array.from(unicos);
console.log(`valoresU2: ${valoresU2}`);
console.table(`valoresU2: ${valoresU2}`);
//valoresU3
const valoresU3 = [...new Set(valores)];
//Set is iterable but it is not a real Array to show it on console I need to turn it back into an array. I use the spreadoperator this time.
console.log(valoresU3);
//Mostrar un Set
console.log("Mostrar un Set");
console.log(`Con JSON.stringify([...unicos]) ${JSON.stringify([...unicos])}`)
