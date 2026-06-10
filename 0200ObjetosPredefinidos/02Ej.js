const cuponesIntroducidos = [
    { usuario: "user_01", codigo: " PROMO-100 " },     // Tiene espacios en los extremos
    { usuario: "user_02", codigo: "descuento-50" },    // Solo tiene 2 dígitos (Inválido)
    { usuario: "user_03", codigo: "DESCUENTO-025" },   // Formato perfecto
    { usuario: "user_04", codigo: "PROMO-9999" },      // Tiene 4 dígitos (Inválido)
    { usuario: "user_05", codigo: "promo-500abc" },    // Tiene letras al final (Inválido)
    { usuario: "user_06", codigo: "Descuento-001" }    // Mezcla mayúsculas/minúsculas y formato correcto
];
//Limpiar el codigo
const cuponesLimpios = cuponesIntroducidos.map((c)=>
{ return {'usuario':c.usuario,
    'codigo':c.codigo.trim()}
});
//RegExp
console.log(cuponesLimpios);
const patronCupon = /^(DESCUENTO|PROMO)-[0-9]{3}$/i;
//Recorrer cuponesLimpios
const cuponesValidos = cuponesLimpios.filter((c)=>
    patronCupon.test(c.codigo)
)
console.log(cuponesValidos);
const cuponesValidosMay = cuponesValidos.map(c=>{
    return {
        'usuario':c.usuario, 
        'codigo':c.codigo.toUpperCase()};
});
console.log(cuponesValidosMay);