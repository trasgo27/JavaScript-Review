const alumnosMatriculados = [
    "  alonso garcia, nacho  ",
    "MARTINEZ GOMEZ, ANA",
    "  perez lopez, JAVIER  ",
    " sanchis blas, marta "
];
const alMatriObj = alumnosMatriculados.map((item)=>{
    return item.split(',');
});
const alMatriObjTrim = alMatriObj.map((a)=>{
    return {
        'apellidos':a[0].trim().toLowerCase(),
        'nombre':a[1].trim().toLowerCase(),
        'nombre_completo':a[1].trim().toLowerCase()+" "
        +a[0].trim().toLowerCase(),
        'nombre_usuario' :a[1].trim().toLowerCase().slice(0,3)+a[0].trim().toLowerCase().slice(0,3),
        'email':a[1].trim().toLowerCase().slice(0,3)+a[0].trim().toLowerCase().slice(0,3)+'@iesserpis.edu'
    }
});
console.log(alMatriObj);
console.log(alMatriObjTrim);

/*
 * === DEBUG REPORT ===
 * Status: ✅ No runtime errors. Output is correct.
 *
 * Issues:
 *   1. ⚠️ Two .map() calls where one suffices
 *   2. ⚠️ .trim().toLowerCase().slice(0,3) computed 6× instead of cached
 *   3. ⚠️ Keys with colons/spaces ('apellidos: ') — awkward to access
 *   4. ⚠️ Single-letter param `a`; inconsistent naming
 *
 * === REFACTORED VERSION ===
 *
 * const alumnos = alumnosMatriculados.map((item) => {
 *     const [apellidos, nombre] = item.split(',').map(s => s.trim().toLowerCase());
 *     const nomPart = nombre.slice(0, 3);
 *     const apePart = apellidos.slice(0, 3);
 *
 *     return {
 *         apellidos,
 *         nombre,
 *         nombre_completo: `${nombre} ${apellidos}`,
 *         nombre_usuario: nomPart + apePart,
 *         email: `${nomPart}${apePart}@iesserpis.edu`
 *     };
 * });
 *
 * console.log(alumnos);
 */