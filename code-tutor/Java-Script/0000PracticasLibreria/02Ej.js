const continuar = true;
 
function verificarEdad(){
    return miPromesa = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const edad = Math.floor((Math.random()*8))+14;
            (edad>=18)
                ?resolve(`Con ${edad}, permitido`)
                :reject( new Error(`Con ${edad}, NO permitido`))
        },1000)
    });    
}
verificarEdad()
.then(men=>console.log(men))
.catch(err=>console.error(err));

 
