//importar json MAL
try {
  const resp = await fetch('nombreMal.json');
  const pars = await resp.json();
  console.table(pars);
} catch(err) {
  console.error(err.message);
}

//importar json BIEN
try{
    const importado = await fetch('libros.json');
    const parseado = await importado.json();
    console.table(parseado);
}catch (err){
    console.error(err);
}

//con funcion
async function importar(nombre) {
    try{
        const impor = await fetch(nombre);
        const par = await impor.json();
        return par;
    }catch (err){
        console.error(err.message);
    }    
}

const impor = importar('libros.json');
console.table(await impor);
