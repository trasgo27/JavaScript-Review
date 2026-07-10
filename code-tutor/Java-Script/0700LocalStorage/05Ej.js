//alert('Welcome Back ...');
//DOM
const input = document.getElementById('input');
const boton = document.getElementById('boton');
const input2 = document.getElementById('input2');
const boton2 = document.getElementById('boton2');

function getCookieValor(){
 const cookiesS = document.cookie;
 const match = cookiesS.split('; ').find((fila)=>fila.startsWith('username='));
 return match ? decodeURIComponent(match.split('=')[1]) : undefined;
}//trasgo

boton.addEventListener('click',(e)=>{
    const nom = input.value;
    console.log(nom);
    let expiracion = new Date();
    expiracion.setTime(expiracion.getTime()+(30*24*60*60*1000));
    document.cookie = `username=${encodeURIComponent(nom)}; expires=${expiracion.toUTCString()}; path=/;`;
});

boton2.addEventListener('click',(e)=>{
    const nom = input2.value;
    console.log(nom);
    if(getCookieValor() === nom){
        console.log('iguales');
    }else{
        console.log('no iguales');
    }
})