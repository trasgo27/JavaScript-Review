//globales
const clicks = {};
function renderGuest() {
    const html = catalogo.map((invitado, i) =>
        `<p class="pAñadido">${i + 1}, nombre: ${invitado.nombre}, sexo: ${invitado.sexo}</p>`
    ).join("");
    return html;
}

function apendarG() {
    dMostrar2.replaceChildren();
    catalogo.forEach((invitado, i) => {
        const p = document.createElement('p');
        p.className = 'pAñadido';
        p.textContent = `${i + 1}, nombre: ${invitado.nombre}, sexo: ${invitado.sexo}`;
        dMostrar2.insertAdjacentHTML('beforeend', p.outerHTML);
    });
}
function mixto(){
    listaMostrar.replaceChildren();
    catalogo.forEach((item,i)=>{
        const miLi = document.createElement('li');
        miLi.dataset.indice = i;
        const html = `${i+1}, nombre: ${item.nombre} de sexo: ${item.sexo}`;
        miLi.textContent = html;
        listaMostrar.appendChild(miLi); //append(); insertAdjacentHTML()
    });
}
function mixtoOptimizado(){
    const arrayList = 
    catalogo.map((inv,i)=>{
        const Li =
        document.createElement('li');
        Li.textContent = `Nombre: ${inv.nombre}, sexo: ${inv.sexo}`;
        Li.dataset.indice = i;
        
        return Li;
    });
    olMixto.replaceChildren(...arrayList);
}
function ordenar(){
    const cata1 = [...catalogo];
    console.table(cata1)
    cata1.sort((a,b)=>
    a.sexo.localeCompare(b.sexo));
    console.table(cata1);
    mostrarSexo(cata1,resultadoFiltro2);

};
function invertir(){};
function mostrarSexo(que,donde,titulo){
    resultadoFiltro2.replaceChildren();
    const catalogoMap = que.map((p,i)=>{
        const pSexo = document.createElement('p');
        pSexo.textContent = `${i+1} Nombre: ${p.nombre}, sexo: ${p.sexo}`;
        pSexo.dataset.indice = i;
        return pSexo;

    });
    const tituloS = `<h3>${titulo}</h3>`;
    
    //donde.replaceChildren();
    donde.insertAdjacentHTML('afterbegin',tituloS);
    donde.append(... catalogoMap);
}
//Event Listener
miBoton.addEventListener('click',(e)=>{
    const nombre = document.getElementById('iNombre').value.trim();
    const sexo = document.getElementById('iSexo').value;
    console.table(nombre, sexo);
    //const valido = (nombre !=="" && (sexo ==='masculino'||sexo ==='femenino'));
    const valido = (nombre !=="");
    const repe = (catalogo.some((ind)=>{
        return ind.nombre.toUpperCase().trim() === 
        nombre.toUpperCase().trim();
    }));
    if(valido){
        if(repe){
            console.log('Valor REPE ...');
        }else{
            catalogo.push({
                nombre,sexo
            });
            console.table(catalogo);
        }
    }else{
        console.log('Valores NO VALIDOS ...');
    }
    //invocar
    dMostrar.innerHTML = renderGuest();
    apendarG();
    mixto();
    mixtoOptimizado();
});
//event Listener
dMostrar3.addEventListener('click',(e)=>{    
    const valor = e.target.value;
    console.log(valor);
    if(!valor) return;
    clicks[valor] = (clicks[valor] || 0) +1 //Otherwise the first time is undefined and throws errors
    console.table(clicks[valor]);
    const catalogoF = catalogo.filter((p)=>{
        return p.sexo === valor;
    });
    mostrarSexo(catalogoF,resultadoFiltro2,`Seleccion ${valor.toUpperCase()} num de veces: ${clicks[valor]}`);
});

dMostrar4.addEventListener('click',(e)=>{
    const valor = e.target.value;
    console.log(valor);
    if(!valor) return;
    (valor === "ordenar")?ordenar():invertir();
});
//invocar
    dMostrar.innerHTML = renderGuest();
    apendarG();
    mixto();
    mixtoOptimizado();
