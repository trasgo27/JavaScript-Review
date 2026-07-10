//alert('Logistica Envios');
//Array of carriers
const transportistas = ['FedEx', 'DHL', 'UPS', 'Seur', 'Correos'];
// Simulates requesting a shipping quote from a carrier
function solicitarCotizacion(transportista, destino) {
  return new Promise((resolve, reject) => {
    const tiempo = Math.floor(Math.random() * 1500) + 500; // 500ms to 2000ms
    const precio = Math.floor(Math.random() * 80) + 20; // $20 to $100
    const diasDeEntrega = Math.floor(Math.random() * 5) + 1; // 1 to 5 days
    const rate = +(Math.random() * 5).toFixed(1); // Rating 0.0 to 5.0

    setTimeout(() => {
      // 75% chance of success
      if (Math.random() > 0.25) {
        resolve({
          carrier: transportista,
          destino: destino,
          costo: precio,
          dias: diasDeEntrega,
          rating: rate,
        });
      } else {
        reject(new Error(`Error de conexion con ${transportista}`));
      }
    }, tiempo);
  });
}

//Fetch quotes from an array of carriers
function solicitarCotizacionTodas(vector, destination) {
  const vectorPromesas = vector.map((carrier) => {
    return solicitarCotizacion(carrier, destination);
  });
  return Promise.allSettled(vectorPromesas);
}

//Retry RECURSION
const INTENTOS_MAX = 3;
function reintentar(fallidosPdt, exitosAcc, intento) {
  if (intento >= INTENTOS_MAX || fallidosPdt.length === 0) {
    console.log('Aciertos Finales ...');
    console.table(exitosAcc);

    if (exitosAcc.length === 0) {
      console.log('No carriers succeeded.');
      return;
    }

    //Encontrar el más rápido, si empatan el más barato
    const elMasRapido = exitosAcc.reduce((min, pre) => {
      //if u leave empty initial value, it takes the first one by default
      if (min.dias < pre.dias) return min;
      if (pre.dias < min.dias) return pre;
      return pre.costo < min.costo ? pre : min; //nota @code-tutor
    });
    console.log('The Fastest Carrier');
    console.table(elMasRapido);
    //Ordenar por dias
    exitosAcc.sort((a, b) => a.dias - b.dias || a.costo - b.costo);
    return;
  }

  console.log('Orden Ascendente');
  console.table(exitosAcc);
  //Encontrar la media de costos
  const media = exitosAcc.reduce((acc,pre)=>
    acc + pre.costo,0);
    console.log(`Precio  medio: ${media/exitosAcc.length}`);


  return solicitarCotizacionTodas(fallidosPdt, 'Pekin')
    .then((resuelta) => {
      const exitosNuevos = resuelta
        .filter((res) => res.status === 'fulfilled')
        .map((res) => res.value);

      const fallidosNuevos = resuelta.reduce((acc, pres, ind) => {
        if (pres.status === 'rejected') {
          acc.push(fallidosPdt[ind]);
        }
        return acc;
      }, []);

      return reintentar(
        fallidosNuevos,
        exitosAcc.concat(exitosNuevos),
        intento + 1,
      );
    })
    .catch((err) => console.error(err));
}

//Call the function and filter successful ones from failed ones
solicitarCotizacionTodas(transportistas, 'Pekin')
  .then((vectorP) => {
    const successfulObj = vectorP
      .filter((p) => p.status === 'fulfilled')
      .map((p) => p.value);

    console.log('Successful Request');
    console.table(successfulObj);

    const failedCarrier = vectorP.reduce((acc, p, i) => {
      if (p.status === 'rejected') acc.push(transportistas[i]);
      return acc;
    }, []);
    console.log('Fallidos');
    console.table(failedCarrier);

    reintentar(failedCarrier, successfulObj, 1);
  })

  .catch((err) => {
    console.error(err);
  });
