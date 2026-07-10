//alert('02Ej.js');
//funcionalidad
function lanzar(){
    return Math.floor(Math.random()*2);
}
//crear Promesa
const miPromesa = new Promise((resolve,reject)=>{
    const resultado = lanzar();
    if(resultado === 0){
        resolve(` ${resultado} es EXITO `);
    }else{
        reject(` ${resultado} es FALLO `);
    }
});

miPromesa
.then((men)=>{
    console.log(men);
})
.catch((err)=>{
    console.log(err);
});