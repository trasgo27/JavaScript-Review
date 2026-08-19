//alert('Restaurantes App');
function consultarRestaurante(nombre) {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2000) + 500;
        setTimeout(() => {
            // 70% chance the order is ready
            if (Math.random() > 0.3) {
                resolve({
                    restaurante: nombre,
                    platos: ["🍕 Pizza", "🥗 Ensalada", "🍝 Pasta"].slice(0, Math.floor(Math.random() * 3) + 1),
                    total: Math.floor(Math.random() * 3000) + 500
                });
            } else {
                reject(new Error(`${nombre} still preparing...`));
            }
        }, tiempo);
    });
}
//API simulada de restaurante
async function perdirARestaurante(nombre) {
    return new Promise((resolve,reject)=>{
        //vector menu
        const menu = 
        [
            {dish:'Ensalada'},
            {dish:'Paella'},
            {dish:'Carne'} 
        ]
        //num aleatorio de exito
        if(Math.random() > 0.7){
            const tiempo = Math.floor(Math.random()*2000)+500;
            const elementos = Math.floor(Math.random()*3)+1
            setTimeout(()=>
                 resolve(
                    //[ no es array devuelve objeto
                    {
                        restaurante:nombre, 
                        pedido: menu.slice(0,elementos), 
                        precio: Math.floor(Math.random()*30)+10
                    }
                    //]`
                )
            ,tiempo);
        }else{
            reject(new Error(`${nombre} is still fixing the menu ...`));
        }        
    })
}
(()=>{
    perdirARestaurante("La Hacienda")
    .then((menu)=>{
        console.table(menu);
    })
    .catch((err)=>
    console.error(err)
    )
})();

//Array de restaurantes
//const finalizadas = [];
//const pendientes = [];
const promesaDePromesas = (()=>{
const restaurantes = ["🧑‍🍳 Ristorante Roma", "🌮 Taqueria Mexico", "🍣 Sushi Palace", "🥟 Dumpling House", "🧁 Sweet Treats"];
const pedidos = restaurantes.map((rest)=>{
    //Promise.any gets an array of promises as parameter and returns another promise
    return Promise.any([
        perdirARestaurante(rest),
        perdirARestaurante(rest),
        perdirARestaurante(rest),
        perdirARestaurante(rest)
    ])
})
    return Promise.allSettled(pedidos); //Promise all Settled returns an Array of Promise Obj
})();

console.log(`Los pedidos a los rest: `);
promesaDePromesas
.then((arr)=>{
    const exitosas = arr.filter((prom)=>{
        return prom.status === "fulfilled";
    });
    const valores = exitosas.map((p)=>
    p.value)
    console.table(valores);
    const fallidas = arr.filter((rest)=>{
        return rest.status === "rejected";
    });
    //mejorar muestra fallidas
    const fallidas2 = fallidas.map((fallo)=>fallo.reason.message);
    (fallidas2.length>0)?console.error(fallidas2):console.log('No hay fallos');
    
})
.catch((err)=>{
    console.error('Error fatal ...',err);
});
   



