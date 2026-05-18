callback function
deep copy of an Array with Object

concise
The parentheses around the curly braces tell js that you r returning an Object, not starting a function block
({
    ...elemento, 
    precio: elemento.precio * 1.1 
})

 //Logic with map
               const productos2 = productos.map(subir(array)
               {
                return 0;});

 //Logic with map
        let productos2 = productos.map(function(elemento){ 
            let nuevoObjeto = {...elemento};
            nuevoObjeto.precio *=1.1;
            return nuevoObjeto;});  