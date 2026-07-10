//API
function pedirTicket(aerolineaN,destinoN){
    //fallo
    //const fallo = (Math.random()>0.3)?false:true;
    const milis = Math.floor(Math.random()*2000)+500;
    const precio = Math.floor(Math.random()*150)+50;
    const asientosLibres = Math.floor(Math.random()*30);
    const valoracion = (Math.floor(Math.random()*101))/10;
    //const valoracion2 = +(Math.random()*11).toFixed(1);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            (Math.random()>0.9)//1 de 9 es fallido, va a entrar reintentar
        ?resolve(
            {
                aerolinea:aerolineaN,
                destino:destinoN,
                precio:precio,
                rate:valoracion,
                asientos: asientosLibres
            }
        )
        :reject( new Error(`Conexión Fallida con - ${aerolineaN}`))
        },milis);        
    })
}
    const vectorAereo = [
        'Iberia',
        'Lufthansa',
        'Ryanair',
        'AirEuropa',
        'Vueling',
        'EasyJet'
    ]

async function pedidoAereo(vectorA){
    const destino = 'Paris';
    //hacer varias busquedas con cada aerolinea
    const pedidos = vectorA.map((aero)=>{
        return Promise.any([
            pedirTicket(aero,destino),
            pedirTicket(aero,destino),
            pedirTicket(aero,destino),
            pedirTicket(aero,destino),
            pedirTicket(aero,destino),
            pedirTicket(aero,destino)
        ])
        
    });
    return Promise.allSettled(pedidos)//retorno es un vector de promesas
    
}
 //promesa es un vector de objetos promesa status, value
pedidoAereo(vectorAereo)
 .then((vector)=>{
    const exitos = vector.filter((p)=>{
        return p.status === "fulfilled";
    }).map((p)=>{
        return p.value;//los valores
    });
    const fallidas = vector
    .filter((p) => p.status === 'rejected')
    .map((p) => {
        const error = (p.reason.errors)? p.reason.errors[0] : p.reason;
        return error.message.split(' - ')[1];
    });
    console.log('Vuelos Exitosos');
    console.table(exitos);
    //buscar el objeto con PRECIO MAS BARATO
    if (exitos.length > 0) {
        const masBarato = exitos.reduce((min, v) =>
            (v.precio < min.precio) ? v : min
        );
        console.log(`Vuelo más barato: ${masBarato.aerolinea} - ${masBarato.precio}€`);
        console.table(masBarato);
    }
    //Sort by rating
    //slice to copy and avoid mutating original
    const ordenada = exitos.slice();
    //sort to order by descending rating order
    ordenada.sort((a,b)=>b.rate-a.rate);
    const ordenada2 = ordenada.map((it)=>{
        return { aerolinea: it.aerolinea, rate: it.rate };
    })
    console.log('Ordenar Rating DESCENDENTE');
    console.table(ordenada);
    console.table(ordenada2);
    //Task 5 Average Price and Average Seats
    if (exitos.length > 0) {
        const mediaPrecios = exitos.reduce((total, v) => total + v.precio, 0) / exitos.length;
        const mediaAsientos = exitos.reduce((total, v) => total + v.asientos, 0) / exitos.length;
        console.log(`Precio Medio: ${mediaPrecios.toFixed(2)}€`);
        console.log(`Media Asientos: ${mediaAsientos.toFixed(1)}`);
    }
    //Re -Intentar
    console.log('Aerolineas Fallidas');
    console.table(fallidas);
    const procesarRetry = fallidas.length > 0
        ? pedidoAereo(fallidas).then((vector)=>{
            const exitos2 = vector.filter((p)=>{
                return p.status === "fulfilled";
            }).map((p)=>{
                return p.value;
            });
            console.log('Vuelos Exitosos Segunda');
            console.table(exitos2);
        })
        : Promise.resolve();
    //Task 6 Race the airlines (runs after retry or directly)
    return procesarRetry
        .then(() => Promise.race(vectorAereo.map(aero => pedirTicket(aero, 'Paris'))))
        .then(ganador => {
            console.log(`Aerolínea más rápida en responder con éxito: ${ganador.aerolinea} (${ganador.precio}€)`);
            console.table(ganador);
        })
        .catch((err)=>{
            console.warn(`🏁 La carrera de velocidad (Promise.race) falló o la aerolínea más rápida falló la conexión: ${err.message}`);
        });
 })
.catch((err)=>{    
    console.error(new Error('Fallo General en la consulta inicial',{cause:err}))
});
