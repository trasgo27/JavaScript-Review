//alert('01SumElementsArray.js');
// ============================================================
// ✅ 01SumElementsArray.js — reduce() exercises (increasing
//     difficulty)
// ============================================================
// Key concepts:
//   acc = accumulator (previous return value)
//   current = current element
//   index = current index (optional)
//   array = original array (optional)
//   initialValue = seed for acc (optional but recommended)
//
//   Without initialValue: acc = array[0], current = array[1]
//   With initialValue:    acc = initialValue, current = array[0]
// ============================================================

// ============================================================
// ✅ Task 1 — Sum all numbers (warm-up)
// ============================================================
const nums1 = [5, 12, 8, 130, 44, 3, 27, 9, 150, 1];
const sum1 = nums1.reduce((sum,cur)=>sum + cur,0);
//const sum1 = nums1.reduce((acc, cur) => acc + cur, 0);
console.log(`Task 1 (sum): ${sum1}`);                 // 389

// ============================================================
// ✅ Task 2 — Product of all numbers (warm-up)
// ============================================================
const nums2 = [2, 3, 4, 5];
const product2 = nums2.reduce((acc, cur) => acc * cur, 1);
console.log(`Task 2 (product): ${product2}`);          // 120

// ============================================================
// ✅ Task 3 — Flatten an array of arrays
// ============================================================
const nested = [[1, 2], [3, [4, 5]], [6]];
const flattened3 = nested.reduce((acc,current)=>{
    return acc.concat(current); //[METHOD:concad()]
},[]);
/*
const flattened3 = nested.reduce((acc, cur) => acc.concat(cur), []);
*/
console.log(`Task 3 (flatten):`, flattened3);
// [1, 2, 3, [4, 5], 6]
//comprobar si queda array
const flattened33 = flattened3.reduce((acc,current)=>{
    if(Array.isArray(current)){
        return acc.concat(current);
    }
    return acc.concat(current);
},[]);
console.log(`concat() twice ${flattened33}`,flattened33);
console.table(flattened33);
//[QUESTION:if you show an array with console.log it is going to show as an array with square brackets]
//[QUESTION: if you show an array with console.table it appears with index]
// ============================================================
// ✅ Task 4 — Count occurrences of each element
// ============================================================
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
//Count fruit occurrencies with a reduce() method starting with {}
//at, findIndex(), includes()
const count4 = fruits.reduce((obj,fruta)=>{
    obj[fruta] = (obj[fruta])?obj[fruta] +1 : 1;
    return obj;
},{})
/*const count4 = fruits.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {});*/
console.log(`Task 4 (count):`, count4);                // { apple: 3, banana: 2, orange: 1 }
//Otro intento con includes
//includes no sirve porque es un método de arrays
// ============================================================
// ✅ Task 5 — Find min and max values
//     Accumulator is an object { min, max }
// ============================================================
console.log('acc["min"], con square brackets');
const nums5 = [12, 5, 8, 130, 44, 3, 27, 9, 150, 1];
const minMax5 = nums5.reduce((acc, num)=>{
    acc["min"] = (num < acc["min"])? num : acc["min"];
    acc["max"] = (num > acc["max"])? num : acc["max"];

    //acc[min] = (num < acc[min])? num : acc[min]; [LITERAL:Sino, no existe la variable]
    //acc[max] = (num > acc[max])? num : acc[max];
    return acc;
},{min:+Infinity,max:-Infinity});
/*
console.log('Create a new object in each iteration ({min:,max:})');
const minMax5 = nums5.reduce((acc, cur) => ({
    min: cur < acc.min ? cur : acc.min,
    max: cur > acc.max ? cur : acc.max,
}), { min: Infinity, max: -Infinity });
*/
console.log(`Task 5 (min/max):`, minMax5);             // { min: 1, max: 150 }
//Otro intento
console.log('The mutation ... acc.min = , con dot notation');
const minMax50 = nums5.reduce((acc,num)=>{
    acc.min = (num < acc.min)? num : acc.min;
    acc.max = (num > acc.max)? num : acc.max;
    return acc;
}
,{min:+Infinity,max:-Infinity});
console.log(`${minMax50.min}, ${minMax50.max}`);

// ============================================================
// ✅ Task 6 — Running total (cumulative sum)
//     Returns an array where each element is the sum up to
//     that point.
// ============================================================
const nums6 = [1, 2, 3, 4, 5];
const running6 = nums6.reduce((acc, corriente, indice)=>{
 
    acc.push(corriente +( (indice>0)? acc[indice-1] : 0));
    return acc;
},[])
console.log(`Task 6 (running total):`, running6); 
const running60 = nums6.reduce((acc, cur) => {
    acc.push((acc.at(-1) ?? 0) + cur);
    return acc;
}, []);

console.log(`Task 6 (running total):`, running60);      // [1, 3, 6, 10, 15]
//[ERROR:Cuidado con typos, al pegar, etc]
//
console.log('Suma incremental con vector[]');
const running600 = nums6.reduce((acc,corri,ind)=>{
    acc[ind] = corri +((acc[ind-1])?acc[ind-1]:0);
    return acc;
},[]);
console.log('Vector Final',running600);
// ============================================================
// ✅ Task 7 — Group objects by a property [IMPORTANTE]
// ============================================================
const people = [
    { name: 'Alice', age: 25, role: 'dev' },
    { name: 'Bob', age: 30, role: 'dev' },
    { name: 'Carol', age: 25, role: 'pm' },
    { name: 'Dave', age: 35, role: 'dev' },
];
//{dev:['Alice','Bob'],pm[]}
//Group object by properties
//30 o + de edad [{},{}] => {[],[]}
console.log('Agrupar personas por edad');
const agruparEdad = people.reduce((acc, presente, ind)=>{
    if(presente.age<30){
        acc.menos30.push(presente.name);
    }else{
        acc.mas30.push(presente.name);
    }
    return acc;
},{menos30:[],mas30:[]});
console.table(agruparEdad);

const grouped7 = people.reduce((acc, cur) => {
    (acc[cur.role] ||= []).push(cur);
    return acc;
}, {});

console.log(`Task 7 (group by role):`);
console.log(`  dev count: ${grouped7.dev.length}`);    // 3
console.log(`  pm  count: ${grouped7.pm.length}`);     // 1
//Segundo Intento
const people70 = [
    { name: 'Alice', age: 25, role: 'dev' },
    { name: 'Bob', age: 30, role: 'dev' },
    { name: 'Carol', age: 25, role: 'pm' },
    { name: 'Dave', age: 35, role: 'dev' },
];
console.log('Mi intento');
console.log(`Task 7 (group by role): {dev:['Alice','Bob'],pm['Holand']}`);
const grouped70 = people70.reduce((acc,corriente)=>{
    if(!acc[corriente.role]){
        acc[corriente.role] = [corriente.name]; //[ERROR:no :] atribuir valor propiedad = 
    }else{
        acc[corriente.role].push(corriente.name);
    }
    return acc;
},{});
console.log(`  dev count: ${grouped70.dev.length}`);    // 3
console.log(`  pm  count: ${grouped70.pm.length}`);     // 1
// ============================================================
// ✅ Task 8 — Remove duplicates
// ============================================================
const dupes = [1, 2, 2, 3, 4, 3, 5, 1, 6];
console.log('Quitar Duplicados');
const unique80 = dupes.reduce((acc, presente)=>{    
    if(!acc.includes(presente)){
        acc.push(presente);
    }
    return acc;
},[]);
console.log(`Task 8 (unique):`, unique80);              // [1, 2, 3, 4, 5, 6]

const unique8 = dupes.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
}, []);

console.log(`Task 8 (unique):`, unique8);              // [1, 2, 3, 4, 5, 6]

// ============================================================
// ✅ Task 9 — Chunk an array into groups of N
// ============================================================
const flat9 = [1, 2, 3, 4, 5, 6, 7, 8]; //{[],[],[]}
const N = 3;
const chunked90 = flat9.reduce((acc, presente, ind)=>{
    const indChunk = Math.floor(ind / N);
    if(ind % N === 0){
        acc[indChunk] = [presente];
    }else{
        acc[indChunk].push(presente);
    }
return acc;
},[]);
console.log(`Mi Intento Task 9 (chunked):`, chunked90);    

const chunked9 = flat9.reduce((acc, cur, idx) => {
    const chunkIdx = Math.floor(idx / 3);
    (acc[chunkIdx] ||= []).push(cur);
    return acc;
}, []);

//const chunked9= "Abrir";
console.log(`Task 9 (chunked):`, chunked9);            // [[1,2,3],[4,5,6],[7,8]]

// ============================================================
// ✅ Task 10 — Mode (most frequent element)
// ============================================================
const nums10 = [1, 3, 3, 3, 2, 2, 4, 3, 5, 2, 2, 2];

//Mi intento
const mapa = nums10.reduce((acc,corriente)=>{
    //si corriente no es key del objeto mapa se pone. Valor 1
    //si ya está se suma uno
    //add the equal sign to save the result
    acc[corriente] = (acc[corriente])?acc[corriente]+1:1;
    return acc;
},{})//{1:2,2:3,3:1}
console.log(`El valor de mapa es: ${mapa}`);
console.table(mapa);
//console.log was showing Object object and I thought it was not working

//mapa ={1:2,2:3,3:1}
const mostFreq2 = Object.keys(mapa).reduce((max, corri, ind)=>{
    max = (mapa[ind]>mapa[max])?ind:max;
    return max;});
console.log("Imprimir las keys:");
console.log(`El valor mas frecuente es ${mostFreq2}`);
//console.log(`El mas freq ${mostFreq}`);
//console.table(mostFreq);
//Su Intento
const mode10 = nums10.reduce((acc, cur) => {
    acc.freq[cur] = (acc.freq[cur] || 0) + 1;
    if (acc.freq[cur] > acc.maxFreq) {
        acc.mode = cur;
        acc.maxFreq = acc.freq[cur];
    }
    return acc;
}, { freq: {}, mode: null, maxFreq: 0 }).mode;
console.log(`Task 10 (mode): ${mode10}`);              // 2

// ============================================================
// ✅ Task 11 — Pipe functions (function composition)
//     Each function in the pipeline receives the output of
//     the previous one.
// ============================================================
const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;
//Pipeline these functions in the opposite order, square, double and plus one
const vectorF = [square, double, add1];
// brackets is wrong, the right one [] (square, double, add1);
const resultado10 = vectorF.reduce((acc,corriente)=>{
    acc = corriente(acc);
    return acc;
},10);
console.log('la func(10)',resultado10);
const pipeline = [add1, double, square];
const result11 = pipeline.reduce((acc, fn) => fn(acc), 3);
console.log(`Task 11 (pipe 3 -> +1 -> *2 -> ^2): ${result11}`);  // 64

// ============================================================
// ✅ Task 12 — Deep flatten (recursive reduce)
//     Flattens nested arrays to any depth.
// ============================================================
function deepFlatten(arr) {
    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? deepFlatten(cur) : cur);
    }, []);
}
const deeplyNested = [1, [2, [3, [4, 5]]], 6];
const flat12 = deepFlatten(deeplyNested);
console.log(`Task 12 (deep flatten):`, flat12);        // [1, 2, 3, 4, 5, 6]
//Mi Solucion
const deeplyNested2 = [1, [2, [3, [4, 5]]], 6];
function allanar(vector){
    const resultado = vector.reduce((acc,corriente)=>{
        if(Array.isArray(corriente)){//comprobar array sí / no
            acc.push(...corriente);//no puedo devolver aquí, length spread operator
            return acc; // nueva linea devolver
        }else{
            acc.push(corriente);//con primario puedo devolver aqui?
            return acc;
        }
        return acc;
    },[]);
    return resultado;
}
const miR12 = allanar(deeplyNested2);
console.log('Mi intento ...');
console.table(miR12);

// ============================================================
// ✅ Summary — All tasks complete
// ============================================================
console.log('\n✅ All 12 reduce() exercises completed successfully.');
