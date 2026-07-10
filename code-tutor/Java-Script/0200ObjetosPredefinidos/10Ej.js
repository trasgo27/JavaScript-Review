const hotelBookings = [
  {
    guest: '  luis garcia ',
    checkIn: '2026-06-12',
    nights: 3,
    roomPrice: 120.45,
    status: 'confirmed',
  },
  {
    guest: 'marta_smith',
    checkIn: '2026-06-10',
    nights: 1,
    roomPrice: 85.0,
    status: 'confirmed',
  },
  {
    guest: 'ANONYMOUS',
    checkIn: 'PENDING',
    nights: 0,
    roomPrice: 0,
    status: 'cancelled',
  }, // ❌ Cancelled
  {
    guest: 'ana martinez ',
    checkIn: '2026-06-15',
    nights: 4,
    roomPrice: 150.99,
    status: 'confirmed',
  },
  {
    guest: 'pepe_perez',
    checkIn: '2026/06/11',
    nights: 2,
    roomPrice: 99.9,
    status: 'confirmed',
  }, // ❌ Wrong Date Format
];
console.table(hotelBookings);
//Strict Filter
const filtro = hotelBookings.filter(
  (p) => ((p.status !=='cancelled') && (!p.checkIn.includes('/')))
);
console.table(filtro);
//Logica 

function primerMayus(cadena){
  const vectorN = cadena.trim().split(/\s+/);
  if (vectorN.length === 0) return "";
  let nombreCompleto = "";
  for(let i = 0; i < vectorN.length; i++){
    const nombre = vectorN[i];
    if (nombre === "") continue;
    const nombre1 = nombre.charAt(0).toUpperCase();
    const nombre2 = nombre.slice(1).toLowerCase();
    nombreCompleto += (i > 0 ? " " : "") + nombre1 + nombre2;
  }
  return nombreCompleto;
}

const mapa1 = filtro.map((p) => {    
  if (p.guest.includes('_')) {
    p.guest = p.guest.replaceAll('_', ' ');
  }
  return {
    ...p,//completador
    guest: primerMayus(p.guest),
    
  };
});
console.table(`Mapa1 antes de Ordenar: ${mapa1}`);
const mapaOrd = mapa1.sort((a,b)=>{
    return a.checkIn.toLocaleLowerCase().localeCompare(b.checkIn.toLocaleLowerCase());
}   
);

console.table("Ordenado: ",mapaOrd);

const mapa2 = mapaOrd.map((p,i)=>{
    const array = [
        "first",
        "next",
        "last"
    ]
    const factura = Math.round(p.roomPrice * p.nights);
    return`${p.guest} checks in ${array[i]} on ${p.checkIn}, factura = ${factura}`;
});
const html = mapa2.map((p,i)=>{
      const array = [
        "first",
        "next",
        "last"
    ]
  return p;
}).join(`<br>`);
const div = document.getElementById('div');
console.table(mapa1);
console.table(mapa2);
console.table(html);
div.innerHTML = html;