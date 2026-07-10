const numbers = [5, 12, 8, 130, 44, 3, 27, 9, 150, 1];
const words = ['reduce', 'map', 'filter', 'find', 'some', 'supercalifragilisticos', 'every', 'flat'];
const products = [
  { name: 'Laptop', price: 1200, category: 'electronics', rating: 4.5 },
  { name: 'Phone', price: 800, category: 'electronics', rating: 4.7 },
  { name: 'Shirt', price: 30, category: 'clothing', rating: 3.8 },
  { name: 'Tablet', price: 500, category: 'electronics', rating: 4.2 },
  { name: 'Jeans', price: 60, category: 'clothing', rating: 4.0 },
  { name: 'Headphones', price: 150, category: 'electronics', rating: 4.6 },
];

// Task 1: Sum all numbers
const sumatorio = numbers.reduce((acc, currentV) => {
  acc += currentV; //!typo
  return acc;
}, 0);
console.log(`Sumatorio: ${sumatorio}`);
console.log(`Average: ${sumatorio / numbers.length}`);
// Task 2: Find the maximum value
const max = numbers.reduce((max, currentV) => {
  return max > currentV ? max : currentV;
});
console.log(`Maximo: ${max}`);
// Task 3: Count even and odd numbers
const pares = numbers.reduce((cont, corriente) => {
  if (+corriente % 2 === 0) {
    cont += 1;
  }
  return cont;
}, 0);
console.log(`Pares: ${pares}`);

const counts = numbers.reduce((acc,currentV)=>{
    if(currentV % 2 === 0){
        acc.even ++;//!typo        
    }else{
        acc.odd ++;
    }
    return acc;
},{even:0,odd:0});
console.log('Valores ... PARES');
console.table(counts); 
// Task 4: Flatten nested array
const nested = [[1, 2], [3, 4, 5], [6], [7, 8, 9]];
const unida = nested.reduce((acc, presente, ind) => {
  if (Array.isArray(presente)) {
    for (let i = 0; i < presente.length; i++) {
      acc.push(presente[i]);
    }
    return acc;
  }else{
    acc.push(presente);
    return acc;
  }
}, []);
console.log(`Array unificada`);
console.table(unida);
//Task 4: Reduce Nested Array Mejorada
const nested2 = [[1, 2], [3, 4, 5], [6], [7, 8, 9],[10,11,12]];
const plana = nested2.reduce((acc,item)=>{
    return Array.isArray(item) ? acc.concat(item) : (acc.push(item), acc);
},[]);
console.log('Metodo Mejorado Flatten');
console.table(plana);
//Task 4: Reduce Nested Array Mejorada
const nested3 = [[1, 2], [3, 4, 5], [6], [7, 8, 9],10,11,12,[100]];
const plana2 = nested3.reduce((acc,item)=>{
    if(Array.isArray(item)){
        //acc.concat(item); concat() only works only with arrays
        acc.push(...item);
    }else{
        acc.push(item);
    }
    return acc;
},[]);
console.log('Metodo Mejorado Flatten');
console.table(plana2);
// Task 5: Group products by category
const products2 = [
    { name: "Laptop", price: 1200, category: "electronics", rating: 4.5 },
    { name: "Phone", price: 800, category: "electronics", rating: 4.7 },
    { name: "Shirt", price: 30, category: "clothing", rating: 3.8 },
    { name: "Tablet", price: 500, category: "electronics", rating: 4.2 },
    { name: "Jeans", price: 60, category: "clothing", rating: 4.0 },
    { name: "Headphones", price: 150, category: "electronics", rating: 4.6 },
];
const categorias = products2.reduce((acc,item)=>{
  if(!acc[item.category]){
    acc[item.category]= [];
  }
  acc[item.category].push(item);
  return acc;
}, {});
console.log(`Categorias: ${categorias}`); 
console.table(categorias);


// Task 6: Build a frequency map
// Expected: { j: 1, a: 2, v: 1, s: 2, c: 1, r: 1, i: 2, p: 1, t: 1, f: 1, u: 1, n: 1 }
const phrase = "javascript is fun";
const frequency = phrase.split('').reduce((acc, char) => {
  if (char === ' ') return acc;
  acc[char] = (acc[char] || 0) + 1;//Buscar un atributo en un objeto. 
  return acc;
}, {});
console.log('Frecuencia de letras:');
console.table(frequency);
// Task 6.1: Case-insensitive frequency map
const phrase2 = "Javascript is fun, yes javascript is fun";

const frequency2 = phrase2.toLowerCase().split('').reduce((acc, char) => {
  if (char === ' ' || char === ',' ) return acc;
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
console.log('Frecuencia de letras (case-insensitive):');
console.table(frequency2);
// Task 7: Total price per category
// Expected: { electronics: 2650, clothing: 90 }
const preciosC = products.reduce((acc, prod) => {
  acc[prod.category] = (acc[prod.category] || 0) + prod.price;
  return acc;
}, {});
console.log('Precio total por categoria:');
console.table(preciosC);
// Task 8: Running totals (use the index)
const totals = numbers.reduce((suma,current,indice)=>{
  if(indice === 0){
    suma.push(current);
  }else{
 
    suma.push(suma[indice-1]+current);
  }
  return suma;
},[]);
console.log('Suma Total');
console.table(totals);
// Task 9: Group numbers into chunks of 3
// Expected: [[5, 12, 8], [130, 44, 3], [27, 9, 150], [1]]
const chunk = numbers.reduce((acc, corriente, indice) => {
  if (indice % 3 === 0) {
    acc.push([corriente]);
  } else {
    acc[acc.length - 1].push(corriente);
  }
  return acc;
}, []);
console.log('Chunks de 3:');
console.table(chunk);
//
// ## Detailed Explanation: How the Chunking Algorithm Works
//
// This code is a classic JavaScript pattern for "chunking" or grouping
// an array into smaller sub-arrays of a specific size (in this case, groups of 3).
//
// ### 1. The Core Engine: Array.prototype.reduce()
// The reduce() method boils down an array into a single value.
// Here, the "single value" is a NEW ARRAY OF ARRAYS.
//
// - acc (Accumulator): The "bucket" building the final result. Starts as [].
// - corriente (Current Value): The current number being processed.
// - indice (Index): The position (0, 1, 2...) in the original array.
//
// ### 2. The Magic Logic: The Modulo Operator (%)
// The key is: indice % 3 === 0
//
// The modulo operator (%) returns the REMAINDER of division.
//   0 % 3 = 0  → True  (start new chunk)
//   1 % 3 = 1  → False (fill last chunk)
//   2 % 3 = 2  → False (fill last chunk)
//   3 % 3 = 0  → True  (start new chunk)
//
// Every 3rd step (indices 0, 3, 6, 9...) we start a brand new group.
//
// ### 3. The if / else Branches
//
// **Scenario A — New group (if indice % 3 === 0):**
//   acc.push([corriente]);
//   Creates a NEW array [corriente] and pushes it into acc.
//
// **Scenario B — Fill existing group (else):**
//   acc[acc.length - 1].push(corriente);
//   Adds to the MOST RECENTLY created group.
//   acc.length = number of groups, so acc.length - 1 = last group index.
//
// ### 4. Why this is a good approach
// Single-pass algorithm — loops through the array exactly ONCE (O(n)).
// Much faster and cleaner than nested loops or multiple slice() calls.
//
// ### 5. Complete Trace
// index │ current │ index % 3 │ Action            │ acc
//     0 │       5 │        0  │ Create new chunk  │ [[5]]
//     1 │      12 │        1  │ Add to last chunk │ [[5,12]]
//     2 │       8 │        2  │ Add to last chunk │ [[5,12,8]]
//     3 │     130 │        0  │ Create new chunk  │ [[5,12,8],[130]]
//     4 │      44 │        1  │ Add to last chunk │ [[5,12,8],[130,44]]
//     5 │       3 │        2  │ Add to last chunk │ [[5,12,8],[130,44,3]]
//     6 │      27 │        0  │ Create new chunk  │ [[5,12,8],[130,44,3],[27]]
//     7 │       9 │        1  │ Add to last chunk │ [[5,12,8],[130,44,3],[27,9]]
//     8 │     150 │        2  │ Add to last chunk │ [[5,12,8],[130,44,3],[27,9,150]]
//     9 │       1 │        0  │ Create new chunk  │ [[5,12,8],[130,44,3],[27,9,150],[1]]
//
// Challenge: If we changed to  if (index % 4 === 0), what would the result be?
// Try to predict before testing.
//
// Task 10: Longest word (Bonus)
// If there's a tie, return the first one.
const masLarga = words.reduce((acc, palabra) => {
  return palabra.length > acc.length ? palabra : acc;
});
console.log(`La palabra mas larga es: ${masLarga}`);
