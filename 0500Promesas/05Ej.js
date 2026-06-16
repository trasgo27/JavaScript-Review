const discosJSON = [
  { nombre: "The Dark Side of the Moon", grupo: "Pink Floyd", año: 1973, tipo: "rock", localizacion: 12, prestado: false },
  { nombre: "Abbey Road", grupo: "The Beatles", año: 1969, tipo: "rock", localizacion: 5, prestado: true },
  { nombre: "Blue in Green", grupo: "Miles Davis", año: 1959, tipo: "indie", localizacion: 3, prestado: false },
  { nombre: "Unknown Pleasures", grupo: "Joy Division", año: 1979, tipo: "indie", localizacion: 8, prestado: false },
  { nombre: "London Calling", grupo: "The Clash", año: 1979, tipo: "punk", localizacion: 14, prestado: false }
];
//imprimir indie filter
const indie = discosJSON.filter((d)=>
    d.tipo === 'indie'
).map((d)=>
    `nombre: ${d.nombre}, grupo: ${d.grupo}, año: ${d.año}, tipo: ${d.tipo}, localizacion: ${d.localizacion}, prestado: ${d.prestado}`
).join('\n');
console.log(`Tipos: INDIE \n`);
console.table(indie);
//ordenar por nombre grupo, hacer una copia
const discografia = [...discosJSON]
.sort((a,b)=>a.nombre.localeCompare(b.nombre))
.map((d)=>
    `nombre: ${d.nombre}, grupo: ${d.grupo}, año: ${d.año}, tipo: ${d.tipo}, localizacion: ${d.localizacion}, prestado: ${d.prestado}`
)
.join('\n');
console.log('Disco por Nombre:')
console.table(`${discografia}`);

//ordenar por grupo
const discografia2 = [...discosJSON]
.sort((a,b)=>
    a.grupo.localeCompare(b.grupo)
)
.map((d)=>`grupo:${d.grupo},`)
.join('\n');
console.log('Grupos:');
console.table(discografia2);
//separar en antes y despues de los 70s


const antes70 = discosJSON.filter((d)=>
parseInt(d.año) < 1970)
.map((d)=>
    `nombre: ${d.nombre}, grupo: ${d.grupo}, año: ${d.año}, tipo: ${d.tipo}, localizacion: ${d.localizacion}, prestado: ${d.prestado}`
).join('\n');
console.log('Discos antes 70:')
console.table(antes70);
//despues 70
const despues70 = discosJSON.filter((d)=> parseInt(d.año)>1970)
.map((d)=>
    `nombre: ${d.nombre}, grupo: ${d.grupo}, año: ${d.año}, tipo: ${d.tipo}, localizacion: ${d.localizacion}, prestado: ${d.prestado}`
).join('\n');
console.log('Discos despues 70:')
console.table(despues70);
//Ordenar de menor a mayor por año
const discografia3 = [...discosJSON]
.sort((a,b)=>a.año - (b.año))
.map((d)=>
    `nombre: ${d.nombre}, grupo: ${d.grupo}, año: ${d.año}, tipo: ${d.tipo}, localizacion: ${d.localizacion}, prestado: ${d.prestado}`
).join('\n');
console.log('Ordenado por año:')
console.table(discografia3);
//asincrona
function obtenerDisco(simularError=false){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(!simularError){
                resolve(discosJSON);
            }else{
                reject("Error505");
            }
        },1500);//simula retraso
    });
}
//consumo
async function ejecutarGestion() {
    try{
        console.log("Solicitar catalogo ...");
        const datosRecibidos = await obtenerDisco();
        //aplicar filtro
        const prestado = datosRecibidos.filter(d=>d.prestado===true);
        console.log("Discos Prestados Cargados Asin: ");
        console.table(prestado);
    }catch(error){
        console.error("Atención: ",error);
    }
}
