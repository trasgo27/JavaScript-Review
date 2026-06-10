const warehouseDispatches = [
    { orderId: " id-9921", dispatchDate: "2026-06-01", transitDays: 3, weightKg: 2.45, zone: "peninsula" },
    { orderId: "INVALID_RECORD", dispatchDate: "ERROR_05", transitDays: null, weightKg: 0, zone: "unknown" }, // ❌ Broken entry
    { orderId: "ID-4412", dispatchDate: "2026-06-04", transitDays: 5.4, weightKg: 14.10243, zone: "BALEARES" },
    { orderId: "id-1055", dispatchDate: "2026-05-28", transitDays: 2, weightKg: 0.85, zone: "peninsula" },
    { orderId: "ID-8831", dispatchDate: "2026-06-02", transitDays: 7, weightKg: 22.6, zone: "canarias" }, // ❌ Exclude later (Canarias)
    { orderId: "id-WRONG-FORMAT", dispatchDate: "2026/06/15", transitDays: 4, weightKg: 5.1, zone: "peninsula" } // ❌ Broken Date format (slashes)
];
//Error transitDays: 5,4 no se usa coma como separador . 
const filtro1 = warehouseDispatches.filter((d)=>{
    const tieneTransitDays = d.transitDays !== null;
    const zonaValida = (d.zone.trim().toLowerCase() =='peninsula'||d.zone.trim().toLowerCase() =='baleares');
    const fechaFormatoISO =  (d.dispatchDate.includes('-'));
    return tieneTransitDays && zonaValida && fechaFormatoISO;  
}    
);

console.table(filtro1);
const formatear01 = filtro1.map((p)=>{
    const dispatch = new Date(p.dispatchDate);
    const expectedDelivery = new Date(dispatch);
    expectedDelivery.setDate(expectedDelivery.getDate() + Math.ceil(p.transitDays));
    return{
        orderId: p.orderId.trim().toUpperCase(),
        dispatchDate: p.dispatchDate,
        transitDays: Math.ceil(p.transitDays),
        expectedDelivery: expectedDelivery.toLocaleDateString(),
        weightKg: Number(p.weightKg.toFixed(1)),
        zone: p.zone.trim().toLowerCase()
    }
});
console.table(formatear01);
//Peso Total

const pesoTotal = formatear01.reduce((acc,act)=>
    acc +act.weightKg,0)
console.log(`Peso Total: ${pesoTotal.toFixed(2)}`);
