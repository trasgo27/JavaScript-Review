const registroAsistentes = [
    "Nacho", "Ana", "Mario", "Ana", "Laura", "Nacho"
];
const ponentes = new Map([
    ["Nacho", "10:00"],
    ["Mario", "11:30"],
    ["Laura", "16:00"]
]);
const asistentesUnicos = new Set(registroAsistentes);
console.table([...asistentesUnicos]);
console.log(`El numero de asistentes es: ${asistentesUnicos.size}`);
//Ana es una de las ponentes
console.log(ponentes.has("Ana"));
(!ponentes.has("Ana"))?console.log(`Ana es Asistente ...`):console.log(ponentes.has("Ana"));
const ponentesA = ponentes.keys();//MapIterator
console.log([...ponentesA]);
console.log([...ponentesA].includes("Ana"))