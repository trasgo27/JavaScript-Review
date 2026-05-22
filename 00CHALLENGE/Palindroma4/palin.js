const div1 = 
document.getElementById("div1");
const div2 = 
document.getElementById("div2");
const boton =
document.getElementById("boton");
const input =
document.getElementById("input"); 
// globales
let p = "";
let pi = "";
const v = [];
let vi = [];
//Listener
boton.addEventListener("click",()=>{
    p = input.value.trim().toUpperCase();
    const largo = p.length;
    if(6<=largo && largo<=12){
        mostrar();
        reversar();
    }else{
        alert(`${p} NO CUMPLE LARGO ...`);
    }
    
});
//Logica
function mostrar(){
    if(v.includes(p)){
        alert(`${p} YA ESTA INCLUIDO ...`);
    }else{
        v.push(p);
        vi.push(p);
    }
    div1.innerHTML = v.join(`<br>`);
}
function reversar(){
    console.log("Entrar reversar()");
    vi = v.map((p)=>{
        let largoP = p.length;
        let pf = "";
        pi = "";
        for(let i = 1 ;i <= largoP; i++){
            pi +=p.charAt(largoP-i);
        }
        console.log("Antes del Return");
        pf = `${p}, ${pi} es PALINDROMA: ,${p === pi}`;
        return pf;
         
        
    });
    div2.innerHTML = vi.join(`<br>`);
    console.log("SALE reversar()");
}