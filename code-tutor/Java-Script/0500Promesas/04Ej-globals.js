//alert('04Ej-globals.js');
const v1=['ola','hola','holax','hol'];
const v2=['ola','hola','holax','hol'];

function generarCadenas(){
    const num1 = Math.floor(Math.random()*4);
    const num2 = Math.floor(Math.random()*4);
    const vector = [];
    const cadena1 = v1[num1];
    const cadena2 = v2[num2];
    vector.push(cadena1);
    vector.push(cadena2);
    return vector;
}

const miProme = new Promise((resolve,reject)=>{
    const vector = generarCadenas();
    const cadena1 = vector[0];
    const cadena2 = vector[1];
    if(cadena1 === cadena2){
        resolve(`${cadena1} y ${cadena2} son IGUALES`);
    }else{
        reject(`${cadena1} y ${cadena2} son DISTINTAS`);
    }
});

miProme
.then((men)=>
    console.log(men)
)
.catch((err)=>{
    console.log(err);
});
