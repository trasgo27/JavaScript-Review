//alert('Portero Disco');
function crearEdad(){
    return Math.floor(Math.random()*9)+14; //crear edades aleatorias entre 14 y 22
}
const miProme = new Promise((resolve,reject)=>{
    const edad = crearEdad();
    if(edad>=18){
        resolve(`${edad}, EXITO`);
    }else{
        reject(`${edad}, FRACASO`);
    }
});

miProme
.then((men)=>console.log(men+" Puede PASAR ..."))
.catch((err)=>console.log(err+" NO Puede PASAR ..."));