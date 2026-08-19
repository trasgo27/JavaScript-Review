function descargarArchivos(nom){
    return new Promise((resolve,reject)=>{
        if(nom.trim()===""||!nom){
            reject('Error en el nombre');
            return;
        }else{
            console.log('inicia descarga');
            setTimeout(()=>{
                resolve('Exito, archivo descargado');
            },3000);
        }
    }  
    );
}
//consumo
descargarArchivos("apuntes.pdf")
.then((men)=>{
    console.log(men);
})
.catch((err)=>{
    console.error(err);
});