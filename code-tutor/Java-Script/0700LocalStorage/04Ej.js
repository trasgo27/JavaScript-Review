//alert('04Ej');
//DOM
const inputOscuro = document.getElementById('inputOscuro');
const divPantalla = document.getElementById('divPantalla');
const divSelect = document.getElementById('divSelect');
//init block
const cookieModo = document.cookie
.split('; ')
.find(row => row.startsWith('modoOscuro='))
?.split('=')[1];
if(cookieModo ==='true'){
    divPantalla.classList.add('modoOscuro');
    inputOscuro.checked = true;
}else{
    divPantalla.classList.remove('modoOscuro');
    inputOscuro.checked = false;
}

inputOscuro.addEventListener('change',(e)=>{
    let seleccionado = e.target.checked;
    if(seleccionado){
        console.log('Seleccionado MODO OSCURO ...');
        divPantalla.classList.add('modoOscuro');
        //Crear la cookie modo Oscuro
        let expiracion = new Date();
        expiracion.setTime(expiracion.getTime()+(30*24*60*60*1000)); //fecha exp 30 dias
        document.cookie = "modoOscuro=true; expires="+expiracion.toUTCString()+"; path=/;";
    }else{
        console.log('No seleccionado');
        divPantalla.classList.remove('modoOscuro');
        //Borrar cookie modo Oscuro
        let expiracion = new Date();
        expiracion.setTime(expiracion.getTime()-(1000*24*60*60*1000));
        document.cookie = `modoOscuro=false; expires=${expiracion.toUTCString()}; path=/;`;
    }
});