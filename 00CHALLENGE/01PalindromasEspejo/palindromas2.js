/** @type {HTMLDivElement} */
const div1 = document.getElementById('div1');
if (div1) {
  /* ... */
}

/** @type {HTMLDivElement} */
const div2 = document.getElementById('div2');
if (div2) {
  /* ... */
}

/** @type {HTMLDivElement} */
const div3 = document.getElementById('div3');
if (div3) {
  /* ... */
}

/** @type {HTMLInputElement} */
const input = document.getElementById('input');
if (input) {
  /* ... */
}

/** @type {HTMLButtonElement} */
const button = document.getElementById('button');
if (button) {
  /* ... */
}
const ul = document.getElementById('ul');

const p2 = document.getElementById('p2');

const p3 = document.getElementById('p3');

//This is an Error. Don't declare a constant if you are going to reassign its value
let palabra = '';
let inversa = '';
let texto = '';
const vector = [];
let textoInv = '';
const vectorInv = [];

button.addEventListener('click', () => {
  palabra = input.value.trim().toUpperCase();
  if (palabra.length >= 6 && palabra.length <= 10) {
    if (!vector.includes(palabra)) {
      vector.push(palabra);
      vectorInv.push(palabra);
      console.log(palabra + ' >>> Insertada en vector');
      mostrar();
      inversar();
    } else {
      alert(palabra + ' ya esta incluida en ' + vector);
    }
  }
});

//mostrar
function mostrar() {
  p2.innerHTML = vector.length 
    ? vector.join(` - `) + `<br>` 
    : "";
}
function inversar() {
  div3.innerHTML = vector
    .map(p => {
      const r = p.split('').reverse().join('');
      return `${p}, ${r}, ${p === r} <br>`;
    })
    .join('');
}
