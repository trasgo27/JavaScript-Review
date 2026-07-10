//alert('Ej---0205---');
// Set up arrays of data
const Array2 = [
    { username: 'Ana', score: 95 },
    { username: 'Luis', score: 82 },
    { username: 'Carla', score: 88 },
    { username: 'Pedro', score: 73 }
];
const Array1 = [
  { username: 'trasgo', score: 42 },
  { username: 'luna', score: 88 },
];
const Array3 = [
  { username: 'Sofia', score: 91 },
  { username: 'Mateo', score: 78 },
  { username: 'Valentina', score: 85 },
  { username: 'Santiago', score: 69 },
];
const Array4 = [
  { username: 'elfo', score: 95 },
  { username: 'dragon', score: 76 },
  { username: 'mago', score: 88 },
  { username: 'grifo', score: 63 },
];
const Array5 = [
  { username: 'Isabella', score: 97 },
  { username: 'Diego', score: 74 },
  { username: 'Camila', score: 83 },
];
const Array6 = [
  { username: 'fénix', score: 99 },
  { username: 'basilisco', score: 55 },
  { username: 'sirena', score: 90 },
  { username: 'centauro', score: 81 },
  { username: 'hidra', score: 67 },
];
const ArrayNom = ['Array1','Array2','Array3','Array4','Array5','Array6'];
const ArrayObj = [Array1,Array2,Array3,Array4,Array5,Array6];
//DOM
const selectG = document.getElementById('selectG');
const selectM = document.getElementById('selectM');
const selectB = document.getElementById('selectB');
const divOutput = document.getElementById('divOutput');
//funciones
function estaGuardado(num){
    const clave = ArrayNom[num];
    const objeto = ArrayObj[num];
    const guardado = window.localStorage.getItem(clave);
    if(guardado){
        console.log(`true`);
        return true;
    }else{
        console.log(`false`);
        return false;
    }
}

function guardar(num){
    const clave = ArrayNom[num];
    const objeto = JSON.stringify(ArrayObj[num]);
    if(estaGuardado(!num)){//no esta guardado
        window.localStorage.setItem(clave,objeto);
        console.log(`Se ha guardado ${clave}`)
        return true;
    }else{
        console.log(`${clave} ya está guardado`);
        return false;
    }
}
function mostrar(num){
    const clave = ArrayNom[num];
    const objeto = ArrayObj[num];
    const html = JSON.stringify(objeto);
    divOutput.innerHTML = `<h3>${clave}</h3> ${html} <br>`;
}
function mostrar2(num){
    //divOutput.innerHTML = "";
    const clave = ArrayNom[num];
    const objeto = ArrayObj[num];
    const html = objeto.map((u)=>
        `<span style="color:red;font-size:30px">Usuario: ${u.username}, Puntos: ${u.score}</span> <br> `
    ).join('<br><br>');
    divOutput.innerHTML = `<h3>${clave}</h3> ${html} <br>`;
}

selectG.addEventListener('change',(e)=>{
    const num = parseInt(e.target.value);
    console.log(`La POSICIÓN es: `,num);
    if(guardar(num)){
        mostrar2(num);
    }else{
        console.log('Ya esta guardado');
        divOutput.innerHTML = `<h3>${ArrayNom[num]}</h3> Ya está GUARDADA ... <br>`;
    }    
});

selectM.addEventListener('change',(e)=>{
    const num = parseInt(e.target.value);
    console.log(`La POSICIÓN es: `,num);
    mostrar2(num);
});

selectB.addEventListener('change',(e)=>{
    const num = parseInt(e.target.value);
    const clave = ArrayNom[num];
    if(estaGuardado(num)){
        window.localStorage.removeItem(clave);
        mostrar2(num);
    }else{
        divOutput.innerHTML = `${ArrayNom[num]} no está en LOCAL STORAGE ...`;
    }
});