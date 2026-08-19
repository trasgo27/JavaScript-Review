
function pedirPalabra() {
    const palabra = prompt("Intro palabra de 6-10 caracteres");
    if (palabra === null) return false;
    if (palabra.length === 0) return false;
    if (palabra.length >= 6 && palabra.length <= 10) {
        //comprobar repetido false
        const repetido = catalogo.some((p)=>p === palabra );
        if(repetido){
            alert(`${palabra} ya está introducida`);
            return true;
        }else{
            catalogo.push(palabra);
            return true;
        }

    }
    alert("Longitud entre 6 y 10 ...");
    return true;
}

let continuar = true;
while (continuar) {
    continuar = pedirPalabra();
}

function darVuelta(p) {
    let palin = "";
    for (let i = p.length - 1; i >= 0; i--) {
        palin += p[i];
    }
    return palin;
}

function esPalindroma(p) {
    return p === darVuelta(p);
}

const invertidas = catalogo.map(darVuelta).join("<br>");
div1.innerHTML = "<h3>Mostrar al reves ...</h3> " + invertidas;

const ordenadoZA = [...catalogo].sort((a, b) => b.localeCompare(a)).join("<br>");
div2.innerHTML = "<h3>Ordenado descendente ...</h3>" + ordenadoZA;

const tabla = catalogo
    .map((p) => `${p}, ${darVuelta(p)}, es:${esPalindroma(p)}`)
    .join("<br>");
div3.innerHTML = "<h3>Final ... </h3>" + tabla;

