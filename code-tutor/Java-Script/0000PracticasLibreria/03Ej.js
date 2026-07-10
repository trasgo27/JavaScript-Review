/*
function delay(ms){
    return new Promise((resolve)=>setTimeout(()=>{
        resolve(); //funcion resolve() cumplir la promesa
    },ms));
}
*/
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verificarEdadAsync(){
    const edad = Math.floor(Math.random()*8)+14;
    await delay(1000);
    if(edad>=18) return `Permitido ${edad}`;
    throw new Error(`No Permitido ${edad}`);
}

async function probarVerificacion() {    
    try{
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    }catch(err){
        console.error(err.message)
    }
}
 
probarVerificacion();