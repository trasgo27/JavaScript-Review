const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const input = document.getElementById("input");
const boton = document.getElementById("boton");
//si se reasigna el valor let
let p = "";
let vector = [];
boton.addEventListener('click',()=>{
    p = input.value.trim().toUpperCase();
    if(vector.includes(p)){
        alert(`${p}, ya está incluido ...`);
        return;
    }
    if(6 <= p.length && p.length <= 12){
        vector.push(p);
        mostrar();
        invertir();

    }else{
        alert(`${p} LONGITUD ... `)
    }
    
});
//Cada vez que presiona invoca mostrar(), invertir()
function mostrar(){
    div2.innerHTML = vector.join(`<br><br>`);
}
function invertir(){
    inversor = vector.map((p)=>{
        let inv = "";
        const largo = p.length;
        for(let j = largo-1 ; j >= 0 ; j--){
            inv += p.charAt(j);
        }
        const esPa = (p === inv);
        return `${inv} es Palindroma: ${esPa}`;
    });
    div3.innerHTML = inversor.join(`<br>`);
    console.table(inversor);
}