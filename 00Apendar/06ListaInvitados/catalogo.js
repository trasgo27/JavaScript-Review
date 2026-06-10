const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const raw = [
    ["Jaime", "masculino"],
    ["Nichol", "femenino"],
    ["Salva", "masculino"],
    ["Claudia", "femenino"],
    ["andres", "masculino"],
    ["mariana", "femenino"],
    ["carlos", "masculino"],
    ["lucia", "femenino"],
    ["pedro", "masculino"],
    ["ana", "femenino"],
    ["jorge", "masculino"],
    ["valentina", "femenino"],
    ["Alex", "Bebe"],
    ["Sam", "Bebe"],
    ["Luca", "Travesti"],
    ["Riley", "Travesti"],
    ["Jordan", "Privado"],
    ["Casey", "Privado"]
];

const catalogo = raw.map(([nombre, sexo]) => ({
    nombre: capitalize(nombre),
    sexo: capitalize(sexo)
}));


const catalogo2 = [...catalogo].sort((a, b) => a.nombre.localeCompare(b.nombre));

const catalogo3 = [...catalogo2].sort((a,b)=>{
    return a.sexo.localeCompare(b.sexo) || a.nombre.localeCompare(b.nombre);
});
