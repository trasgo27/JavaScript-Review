const actividadApp = [
    { usuario: " alex99 ", accion: "login" },
    { usuario: "MARIA_88", accion: "POST_COMMENT" },
    { usuario: "alex99",   accion: "login" },        // Repetido
    { usuario: " brian_t ", accion: "post_comment" }, // Mismas acciones, distinto casing
    { usuario: "Alex99",   accion: "LOGOUT" },       // Mismo usuario, diferente casing
    { usuario: "maria_88", accion: "view_photo" },
    { usuario: " brian_t ", accion: "LOGIN" },
    { usuario: "Charly_7", accion: " login " },
    { usuario: "charly_7", accion: "LOGOUT" },
    { usuario: "  diana_99  ", accion: "post_comment" },
    { usuario: "DIANA_99", accion: "LOGIN" },
    { usuario: " alex99 ", accion: "view_photo" }
];
//trimear
const actTrim = actividadApp.map((p)=>{
    return {'usuario':p.usuario.trim().toUpperCase(),
        'accion':p.accion.trim().toUpperCase()       
    };
});
console.log(actTrim);
//Usuarios Unicos
const usu_Unicos = new Set(actTrim.map(p=>{
    return JSON.stringify(p.usuario) }));

console.log(usu_Unicos);

//acciones Unicas
const acc_Unicas = new Set(actTrim.map(p=>p.accion));
console.log(acc_Unicas);
//frecuencia Map()
const frecUsu = new Map();
actTrim.forEach(p=>{
    if(p.accion === 'LOGIN'){
        const usu = p.usuario; //No es necesario convertir a String
        if(frecUsu.has(usu)){
            const frec = frecUsu.get(usu);
            frecUsu.set(usu,frec+1);
        }else{
            frecUsu.set(usu,1);
        }
    }    
})
console.log(`Usuarios login: `,[...frecUsu]);
//usuarios postcomment
const frecUsuPost = new Map();
actTrim.forEach(p=>{ //actTrim es ARRAY
    if(p.accion === 'POST_COMMENT'){
        const usu = p.usuario;
        if(frecUsuPost.has(usu)){
            const frecu = frecUsuPost.get(usu);
            frecUsuPost.set(usu, frecu+1);            
        }else{
            frecUsuPost.set(usu,1);
        }
    }
});
console.log(`Frecuencia POST_COMMENT: `,[...frecUsuPost]);