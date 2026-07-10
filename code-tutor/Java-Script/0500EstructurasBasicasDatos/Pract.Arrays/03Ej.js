const logsServidor = [
    { userId: "USR_10", action: " PURCHASE ", status: "completed" },
    { userId: "usr_25", action: "view_item", status: "completed" },
    { userId: "USR_10", action: "purchase", status: "completed" }, // ¡Duplicado idéntico!
    { userId: "usr_42", action: "PURCHASE", status: "failed" },    // ¡Compra fallida!
    { userId: "Usr_10", action: "purchase", status: "completed" }, // ¡Mismo usuario, diferente casing!
    { userId: "usr_25", action: "VIEW_ITEM", status: "completed" },// ¡Duplicado de vista!
    { userId: "usr_88", action: "purchase", status: "completed" }
];
console.log(logsServidor);
//Filtrar Limpiar
const logLimpio = logsServidor.map((item) => ({
    userId: item.userId.trim().toLowerCase(),
    action: item.action.trim().toLowerCase(),
    status: item.status.trim().toLowerCase()
})).filter((item)=>{
    return item.action === "purchase" && item.status === "completed";
});
console.log(logLimpio);
console.log(JSON.stringify(logLimpio,null,2));
console.log(logLimpio.forEach(item =>
     console.log(item.userId, item.action, item.status)
));
const miSet = new Set(logLimpio);
console.log([...miSet]);
console.log(miSet.forEach(e=> 
    console.log(e.userId, e.action, e.status)
));
console.log( [...miSet].map(e=>JSON.stringify(e)));
//Set no funciona con Objetos
let miSetDOS = [...new Set([...miSet].map(item=>JSON.stringify(item)))].map(item=>JSON.parse(item));
console.log(JSON.stringify(miSetDOS));
//Set desde la Array Limpia
let miSetTRES = new Set(logLimpio.map(e=>JSON.stringify(e)));
console.log([...miSetTRES]);

//contador frecuencia acciones validas
const limpiaArray = logsServidor.map((item)=>({
    userId: item.userId.trim().toUpperCase(),
    action: item.action.trim().toUpperCase(),
    status: item.status.trim().toUpperCase()
}));
console.log(limpiaArray);
console.log(limpiaArray.map((p)=>{
    return JSON.stringify(p)
}));
//no duplicados
const limpiaSet = new Set(limpiaArray);
console.log([...limpiaSet]);
//no se puede aplicar Set sobre Obj hay que convertir a String
const limpiaSetDOS  = [...new Set(limpiaArray.map((i)=>JSON.stringify(i)))].map((it)=>{
    return JSON.parse(it);
}); 
//Definir Objetos
console.log(limpiaSetDOS);
console.log([...limpiaSetDOS]);
const frecuenciaExito = new Map();
//Cuantas veces se ha realizado con exito cada tipo de acc.
const logsServidorLimpio = logsServidor.map((item)=>{
    return {'userId':item.userId.trim().toUpperCase(), 'action':item.action.trim().toUpperCase(), 'status':item.status.trim().toUpperCase()};
});
//En el log limpio tengo

logsServidorLimpio.forEach((item)=>{
    if(item.status==='COMPLETED'){
    const accion = item.action;
    if(frecuenciaExito.has(accion)){
        frecuenciaExito.set(accion, frecuenciaExito.get(accion)+1);
    }else{
        frecuenciaExito.set(accion,1);
    }
    }
}); 
//ordenar


const frecuenciaExitoAsc = [...frecuenciaExito].sort((a,b)=>{
    return a[1]-b[1];
})


console.log(`Log Bruto es: `,logsServidor);
console.log(`Log Limpio es: `,logsServidorLimpio);
console.log(`frecuenciaExito es: `,frecuenciaExito);
console.log(`Ascendente: `,frecuenciaExitoAsc);