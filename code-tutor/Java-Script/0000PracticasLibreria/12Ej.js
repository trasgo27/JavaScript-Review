//Simulated API
//Funcion que toma el restaurante como parametro.
//Devuelve una Promesa
//setTimeout que simula una API
//algunas petiones fallan porque la comida no está lista
function pedirRestaurante(nombre) {
  return new Promise((resolve, reject) => {
    const miliseg = Math.floor(Math.random() * 2000) + 500;
    const acabado = Math.random();
    const dificultad = 0.3;
    const precioV = Math.floor(Math.random() * 10) + 15;
    //Los platos es un vector
    const platos = ['Ensalada', 'Gazpacho', 'Ribeye'];
    //Todo dentro de un timer
    setTimeout(() => {
      acabado > dificultad
        ? resolve({
            rest: nombre,
            menu: platos.slice(0, Math.floor(Math.random() * platos.length)+1),//+1 evita 0
            precio: precioV,
          })
        : reject( new Error(`${nombre} no ha acabado aún, espere un poco`));
    }, miliseg);
  });
}
//voy a comprobar todos los restaurantes
//map()
//Hacer varias llamadas a cada uno
//igualar con const
//devolver promesa, allSettled, todas estan finalizadas
const pedidoG = (()=>{
//vector de Restaurantes
const vRest = [
    'Comida Tradicional',
    'Comida China',
    'Arrocería',
    'Pizería',
    'Argentina'
];

const vRest2 = vRest.map((r)=>{ //curly braces van con return
    return Promise.any( //devuelve una Promesa, la promesa envuelve el Objeto
    [
        pedirRestaurante(r),
        pedirRestaurante(r),
        pedirRestaurante(r),
        pedirRestaurante(r),
        pedirRestaurante(r)
    ])    
})
return Promise.allSettled(vRest2);

})();
//recoger el resultado
pedidoG
.then((vector)=>{
    const acabados2 = vector.filter((tipo)=>{
        return tipo.status === 'fulfilled' //no assignment
    }).map((acabados)=>{
        return acabados.value;//Estoy quitando el wraper, accedo al objeto
    })
    console.table(acabados2);
})
.catch((err)=>{console.error(err)});

