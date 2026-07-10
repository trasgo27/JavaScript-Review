const hotelBookings = [
    { guest: "  luis garcia ", checkIn: "2026-06-12", nights: 3, roomPrice: 120.45, status: "confirmed" },
    { guest: "marta_smith", checkIn: "2026-06-10", nights: 1, roomPrice: 85.00, status: "confirmed" },
    { guest: "ANONYMOUS", checkIn: "PENDING", nights: 0, roomPrice: 0, status: "cancelled" }, // ❌ Cancelled
    { guest: "ana martinez ", checkIn: "2026-06-15", nights: 4, roomPrice: 150.99, status: "confirmed" },
    { guest: "pepe_perez", checkIn: "2026/06/11", nights: 2, roomPrice: 99.90, status: "confirmed" } // ❌ Wrong Date Format
];
console.table(hotelBookings);
//Strict Filter
const filtro = hotelBookings.filter((p)=>
    p.status !=="cancelled" && !(p.checkIn.includes('/'))
);
console.table(filtro);

const mapa1 = filtro.map((p)=>{
    if(p.guest.includes('_')){
        p.guest= p.guest.replace('_',' ');
     }     
    
    const nombAp = p.guest.trim().split(' ');
    const nombre1 = nombAp[0].trim().charAt(0).toUpperCase();
    const nombre2 = nombAp[0].trim().slice(1).toLowerCase();
    const nombre = nombre1 +nombre2;

    const apellido1 = nombAp[1].trim().charAt(0).toUpperCase();
    const apellido2 = nombAp[1].trim().slice(1).toLowerCase();
    const apellido = apellido1 +apellido2;

    const nombre_completo = nombre +" "+ apellido;
        
    return{
        guest: nombre_completo,
    }
});
console.table(mapa1);