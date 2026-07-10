//10.000 tiradas
let miMap = new Map();
const cont = 0;
for(let i=1; i<=10 ;i++){
miMap.set(i,0);
}

for (let i = 1; i <= 10000; i++) {
  let num = Math.floor(Math.random() * 10) + 1; //num entre 1-10
  //let valorActual = miMap.num;
  let valorActual = miMap.get(num);
  //Map key puede ser cualquier objeto
  
  miMap.set(num,valorActual +=1);
}
console.table([...miMap]);
