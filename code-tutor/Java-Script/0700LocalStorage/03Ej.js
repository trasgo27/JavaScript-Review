//DOM
const inputOscuro = document.getElementById('inputOscuro');
const divPantalla = document.getElementById('divPantalla');
const divSelect = document.getElementById('divSelect');

// Cookie Helper Functions
function setCookie(name, value, days = 30) {
    //generar date
    const date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    const expires = ";expires="+date.toUTCString();
    document.cookie = name +"="+(value||"")+expires+";path=/;SameSite=Lax"
}

function getCookie(name) {
    const nameEQ = name + "=";
    const vector = document.cookie.split(';');
    for(let i=0;i<vector.length;i++){         
        let vecLim =vector[i];
        while(vecLim.charAt(0)===" ")
            vecLim = vecLim.substring(1);
        if(vecLim.indexOf(nameEQ)==0)
            return vecLim.substring(nameEQ.length);
    }
    return null;
}


// comprobar si la cookie esta guardada al cargar
const cookieModo = getCookie('modoOscuro');
if (cookieModo === 'si') {
    divPantalla.classList.add('modoOscuro');
    divPantalla.innerHTML = `<h2>Modo Oscuro PUESTO</h2>`;
    inputOscuro.checked = true;
} else {
    divPantalla.classList.remove('modoOscuro');
    divPantalla.innerHTML = `<h2>Modo Oscuro QUITADO</h2>`;
    inputOscuro.checked = false;
}

inputOscuro.addEventListener('change', (e) => {
    // e.target.checked evaluates whether checkbox is checked
    if (e.target.checked) {
        divPantalla.classList.add('modoOscuro');
        divPantalla.innerHTML = `<h2>Modo Oscuro PUESTO</h2>`;
        setCookie('modoOscuro', 'si');
    } else {
        divPantalla.classList.remove('modoOscuro');
        divPantalla.innerHTML = `<h2>Modo Oscuro QUITADO</h2>`;
        setCookie('modoOscuro', 'no');
    }
});
           