//50 tiradas de 6
const data = [];
for(let i=1 ; i<=50 ; i++){
    const tirada = new Set();
    while(tirada.size < 6){ //size equivale a length 0-5 
        const num = Math.floor(Math.random()*49)+1;//+1 evitar 0 y llegar 49
        tirada.add(num);
        console.log(num);
    }
    data.push(tirada);
    console.table([...tirada]);
}
console.table(data);
