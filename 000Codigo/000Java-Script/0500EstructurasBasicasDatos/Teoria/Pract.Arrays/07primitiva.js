let combinaciones= [];
for(let i=1;i<=50;i++){
const combi = new Set();

while(combi.size <= 5){
    const num = Math.floor(Math.random()*49)+1;
    console.log(`El num: ${num}, combi size: ${combi.size}`);
    combi.add(num);   
}
    combinaciones.push(combi);
    console.table([...combi]);
}
console.table(combinaciones.forEach((c)=>
    console.table([...c])));
