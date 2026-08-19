//objetos
const miCheck = document.getElementById('iCheck');
const miBoton = document.getElementById('bBorrar');
const miBody = document.getElementById('miBody');

//Local Storage
if(localStorage.getItem('modo')==='oscuro'){
    miBody.classList.add('modoOscuro');
    miCheck.checked = true;
}

//eventListeners
miCheck.addEventListener('change',(e)=>{    
    if(miCheck.checked){
        localStorage.setItem('modo', 'oscuro');
        miBody.classList.add('modoOscuro');
    }else{
        localStorage.removeItem('modo');
        miBody.classList.remove('modoOscuro');
    }
});

miBoton.addEventListener('click', () => {
    localStorage.removeItem('modo');
    miCheck.checked = false;
    miBody.classList.remove('modoOscuro');
});