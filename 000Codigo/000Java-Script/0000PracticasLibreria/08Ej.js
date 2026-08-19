const ciudades = {
    1:{id:1, nombre:'Madrid', clima:'soleado'}, //key:'value'
    2:{id:2, nombre:'Maracaibo', clima:'tropical'},
    3:{id:3, nombre:'Moscu', clima:'frio'}
}; //ciudades es un Objeto que representa BD
  
async function obtenerSoloClima(id){
    return new Promise((resolve,reject)=>{
//setTimeout sends the id of the timer in case you want to stop it, but it is not asynch
        //await setTimeout(() => {
        setTimeout(() => {
            (!ciudades[id])
            ?reject(new Error(`ciudad con ${id} no encontrada`))
            :resolve (ciudades[id].clima);
        }, 1000);
    })
}

//async function obtenerCiudad(id) { async creates a second envelope
    function obtenerCiudad(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>
        (!ciudades[id])
        ?reject(new Error(`No hay ciudad con id ${id}`)) 
        :resolve(ciudades[id])
        ,1000);
    })
}

//Invocar
const ciudadValida = obtenerSoloClima(1);
console.log('Ciudad Valida para obtenerSoloClima()');
console.table(ciudadValida);
//Invocar no valida
const ciudadNOValida = obtenerSoloClima(99);
console.log('Ciudad NO Valida para obtenerSoloClima()');
console.table(ciudadNOValida);

async function cargarDashboardClima() {
    const ciudadesIds = [1, 2, 99, 3, 77];

    // 1. Use .map() to create an array of promises
    const promesasV = ciudadesIds.map((id)=>obtenerCiudad(id));
    // 2. Use await Promise.allSettled() to wait for all of them
    //allSettled() is a method that requires an array of promises as a parameter, right?
    const resultadosV = await Promise.allSettled(promesasV);
    // 3. Use .filter() to separate the successful promises and failed ones
    // Promise.value = fulfilled or Promise.value = rejected
    const fulfilledV = resultadosV.filter((promi)=>{
        return promi.status === 'fulfilled';
    });
    const rejectedV = resultadosV.filter((promi)=>{
        return promi.status === 'rejected';
    });
    // 4. Print the results!
    console.log('Promesas fulfilled ...');
    console.table(fulfilledV);
    const mostrarV = fulfilledV.map((item)=>item.value );
    console.table(mostrarV);
    console.log('Promesas rejected ...');
    console.table(rejectedV);
}

cargarDashboardClima();
