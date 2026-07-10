//crypto currency portfolio
const monedas = ['BTC', 'ETH', 'SOL', 'BTC', 'DOGE', 'ETH'];

//API simulator of an unreliable crypto currency to get values
async function llamarServidor(cryptoC) {
  //tiempo aleatorio
  const tiempo = Math.floor(Math.random() * 2000) + 500;
  //Crear Promesa
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      (Math.random() > 0.5)? resolve({
            monedaNombre: cryptoC,
            value: (Math.random() * 5000) + 1000,
          })
        : reject(new Error('Llamada FALLIDA ...'));
    }, tiempo);
  });
}
//Ejecutar Servidor
//Inmediate Invoke Anonymous Function
//Note the brackets
(async()=>{
console.table(await llamarServidor('BitcoinCERO'));
})();
//Anonymous
(async()=>{
    return llamarServidor('BitcoinUNO');
})()
.then((obj)=>console.table(obj))
.catch((err)=>{console.error(err)})
//then catch
llamarServidor('BitcoinDOS')
.then((promesa)=>console.table(promesa))
.catch((err)=>console.error(err));
//funcion normal
async function invocarServidor() {
    return await llamarServidor('BitcoinTRES');
    /*
    await and then are redundant ONE or the other
    the advantage with then is that I know how to deal with the error
    .then((obj)=>console.table(obj))
    .catch((err)=>console.error(err));
    */
}
invocarServidor()
.then((obj)=>console.table(obj))
.catch((err)=>console.error(err));

//Get rid of repeated values
const monedasSet = new Set(monedas);
const monedasUniVector = Array.from(monedasSet);
const monedasUniVectorDOS = [...monedasSet];
console.log('monedasUniVector')
console.table(monedasUniVector);
console.log('monedasUniVectorDOS');
console.table(monedasUniVectorDOS);
//Get an array of Promises from the array of crypto currencies

function ejecutarMap(){
    const promesasRapidasV =
    monedasUniVector.map((moneda)=>{
        return Promise.any([
            llamarServidor(moneda),
            llamarServidor(moneda)
        ])
    });
    return Promise.allSettled(promesasRapidasV); //vector de promesas cumplidas, alguna falla
}

ejecutarMap()
.then((obj) => {
  console.log('Array the promesas');
  console.table(obj);
  //filter the items that are successful
  console.log('valores recogidos')
  const exitosas = obj.filter((coin)=> coin.status === 'fulfilled');
  const html = exitosas.map((coin,ind)=>{
        return  `---${ind}, nombre: ${coin.value.monedaNombre}, valor: ${coin.value.value}` 
  }).join(``);
  console.table(`${html}`);
  //valor
  const valor = exitosas
  .map((coin)=>{
    return coin.value.value
  })
  .reduce((total,actual)=> total +=actual,0);
  console.log(`El valor del portfolio es: ${valor}`);
})
.catch((err)=>(console.error(err)));








