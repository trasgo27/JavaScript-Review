const votosBrutos = [
    " Ascensor ", "piscina", "ascensor", "Piscina", 
    "ascensor", "  Ascensor", "Gimnasio", "piscina", "gimnasio"
];
//Limpieza y Unicidad
const propuestasUnicas = new Set(votosBrutos);
console.log(propuestasUnicas);
console.log([...propuestasUnicas]);
//Limpiar
const votosNetos = votosBrutos.map((i)=>{
    return i.trim().toLowerCase()
});
console.log("ANTES: ",votosNetos);
const propuestasUnicasNetas = new Set(votosNetos);
console.log("UNICOS: ", propuestasUnicasNetas);
//recuento
const recuentoVotos = new Map();
//contar
votosNetos.forEach((i)=>{
    if(recuentoVotos.has(i)){
        let vActual = recuentoVotos.get(i);
        recuentoVotos.set(i,vActual +=1)
    }else{
        recuentoVotos.set(i,1);
    }
});
//Convertir el Map en un Array de Entrada piscina:1, 
const ranking  = [...recuentoVotos.entries()];
//ordenar
ranking.sort((a,b)=>{
    return b[1]-a[1];
});
//mostrar
console.log(ranking);


 