/** @type {HTMLDivElement}*/
const miDiv 
= document.getElementById('miDiv');
/** @type {HTMLDivElement}*/
const divMostrar 
= document.getElementById('divMostrar');
/** @type {HTMLDivElement}*/
const divMostrar2 
= document.getElementById('divMostrar2');
/** @type {HTMLInputElement}*/
const miInput 
= document.getElementById('miInput');
/** @type {HTMLButtonElement}*/
const miBoton
= document.getElementById('miBoton');

const misPalabras = [];

miBoton.addEventListener('click',()=>{
    const palabra = miInput.value.trim().toUpperCase();
    if(palabra.length< 6 || palabra.length>10){
        alert(`${palabra} no cumple, tiene ${palabra.length} caracteres`);
        return;
    }
    if(misPalabras.includes(palabra)){
        alert(`"${palabra}" ya existe`);
        miInput.value = "";
        return;
    }
    misPalabras.push(palabra);
    miInput.value = "";
    mostrarPalabras(misPalabras);
    invertirPalabras();
});

//Logica
function mostrarPalabras(vector){
    divMostrar.innerHTML = vector.join('<br>');
}

function invertirPalabras(){    
    let texto = "";
    for(let i=0 ; i < misPalabras.length ; i++){
        let reverso = "";
        const palabra = misPalabras[i];
        for(let j= palabra.length-1; j>=0; j--){
            reverso += palabra.charAt(j);
        }
        const palindroma = (palabra === reverso);
        const color = palindroma ? 'green' : 'red';
        texto += `<span style="color:${color}">${palabra} - ${reverso} - ${palindroma}</span><br>`;           
    }
    divMostrar2.innerHTML = texto;
}
//Mostrar


