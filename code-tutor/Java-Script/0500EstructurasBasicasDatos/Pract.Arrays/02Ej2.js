const votosBrutos = [
    " Ascensor ", "piscina", "ascensor", "Piscina", 
    "ascensor", "  Ascensor", "Gimnasio", "piscina", "gimnasio"
];
//Create a clean Array
const votosNetos = votosBrutos.map((v)=>{
    return v.trim().toLowerCase();
});
console.log(votosNetos);
//Create a Set with the options
const propuestas = new Set(votosNetos);
console.log(`Hay ${propuestas.size} diferentes:`);
propuestas.forEach(item => console.log(item));//Para visualizar forEach()
//Escrutinio con Map
const recuento = new Map();
let valorActual = 0;
votosNetos.forEach((item)=>{
    if(recuento.get(item)){
        valorActual = recuento.get(item);
        valorActual  +=1;
        recuento.set(item,valorActual);
    }else{
        recuento.set(item,1);
    }
    });
console.log(recuento);
console.log([...recuento]);
//Ordenar descendete

//Ordenar ascendente
const recuentoAsc = [...recuento].sort((a,b)=>{
    return a[1] -b[1]
});
console.log(`Ord Ascendente: `, recuentoAsc);