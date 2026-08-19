//alert('Hola Mundo');
const miCuerpo = document.getElementById('cuerpo');
const miCheck = document.getElementById('checkBox');
const miBorrar = document.getElementById('borrar');

//comprobar localstorage
if(window.localStorage.getItem('darkMode')){
    miCuerpo.classList.add('claseOscura');
    miCheck.checked = true;
}

    miCheck.addEventListener('change',(e)=>{
    if(miCheck.checked){
        miCuerpo.classList.add('claseOscura');
        window.localStorage.setItem('darkMode','true')
    }else{
        miCuerpo.classList.remove('claseOscura');
        window.localStorage.removeItem('darkMode');
    }
})

miBorrar.addEventListener('click',(e)=>{
    window.localStorage.removeItem('darkMode');
    miCuerpo.classList.remove('claseOscura');
    miCheck.checked= false;
});
