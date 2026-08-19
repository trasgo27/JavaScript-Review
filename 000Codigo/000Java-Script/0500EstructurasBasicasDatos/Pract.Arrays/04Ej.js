const logsServidor = [
    { userId: "USR_10", action: " PURCHASE ", status: "completed" },
    { userId: "usr_25", action: "view_item", status: "completed" },
    { userId: "USR_10", action: "purchase", status: "completed" }, // ¡Duplicado idéntico!
    { userId: "usr_42", action: "PURCHASE", status: "failed" },    // ¡Compra fallida!
    { userId: "Usr_10", action: "purchase", status: "completed" }, // ¡Mismo usuario, diferente casing!
    { userId: "usr_25", action: "VIEW_ITEM", status: "completed" },// ¡Duplicado de vista!
    { userId: "usr_88", action: "purchase", status: "completed" }
];
console.log('Array Inicial de Obj: ', logsServidor);
console.log(JSON.stringify(logsServidor,null,2))

//Limpiar
const logsServidorLimpio = logsServidor.map((item)=>{
    return {
        'userId': item.userId.trim().toLowerCase(), 'action':item.action.trim().toLowerCase(), 'status':item.status.trim().toLowerCase()
    }

}); 
//
const div = document.getElementById('div');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
console.log(logsServidorLimpio);
console.log(JSON.stringify(logsServidorLimpio,null,2));
//Set de Usuarios Unicos
const usuariosSet = new Set();
//Set de Acciones Unicas
const accionesSet = new Set();
div.innerHTML =logsServidorLimpio;
const html = JSON.stringify(logsServidorLimpio,null,2);
div1.innerHTML = html;
//Convertir a string
const html2 = logsServidorLimpio.map((p)=>{
    return `usuario: ${p.userId}, acc: ${p.action} status: ${p.status}`;
}).join('<br>');
div2.innerHTML = `<h3 style="color:red">Log Formalizado:</h3> ${html2}`;
//A partir de html crear los sets

const miSet = new Set(html);
console.log(miSet);

//Crear Set usuarios
const usuariosUni = [...new Set(logsServidorLimpio.map((p)=>JSON.stringify(p.userId)))].map((p)=>JSON.parse(p));
console.log([...usuariosUni]);

//Crear Set acciones
const accionesUni = [... new Set(logsServidorLimpio.map(p=>JSON.stringify(p.action)))].map(p=>JSON.parse(p));
console.log([...accionesUni]);

//Crear un Map de frecuencias
//cuantas veces ha comprado cada User que ha sido completed
const frecuencias = new Map();
logsServidorLimpio.forEach(p=>{
    if(p.status==="completed"){
        const usu = p.userId;
        if(frecuencias.has(usu)){            
            let veces = frecuencias.get(usu);
            veces +=1;
            frecuencias.set(usu,veces);
        }else{
            frecuencias.set(usu,1);
        }
    }
});
console.log([...frecuencias]);
//ordenar ascendente
const ascendente = [...frecuencias].sort((a,b)=>a[1]-b[1]);
console.log([...frecuencias]);
console.log(ascendente);