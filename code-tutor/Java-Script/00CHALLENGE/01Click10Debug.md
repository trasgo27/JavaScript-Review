Excellent progress 👏
Now you are starting to think like a real frontend developer:

* reusable functions ✅
* limits ✅
* dynamic buttons ✅
* localStorage persistence ✅

Your architecture is MUCH better now.

But there are still some important bugs and simplifications you should learn.

---

# ❌ 1. BIG bug in `restar10`

You wrote:

```js id="mooq0x"
miRestar10.addEventListener('click',(e)=>{
    restar(e);
});
```

⚠️ `e` is the event object, NOT the number 10.

So later:

```js id="u9t1mk"
for (let i = 0; i < num; i++)
```

becomes:

```js id="89b1bw"
i < [MouseEvent object]
```

❌ Wrong.

---

## ✅ Fix

```js id="qeqglz"
miRestar10.addEventListener('click', () => {
    restar(10);
});
```

---

# ❌ 2. Same problem in normal reduce button

You wrote:

```js id="z8wxzm"
miRestar.addEventListener('click', (e) => {
    restar();
});
```

But `restar()` expects a number now.

---

## ✅ Fix

```js id="zd0dhh"
miRestar.addEventListener('click', () => {
    restar(1);
});
```

---

# ❌ 3. Typo bug (`btnSubstr`)

You wrote:

```js id="8y8thz"
document.getElementById('btnSubstr');
```

But your button is:

```html id="msh6na"
btnSubst
```

⚠️ Missing `"t"` / typo.

---

## ✅ Fix

```js id="v8itbd"
document.getElementById('btnSubst');
```

---

# ⚠️ 4. Your logic is becoming too complex

Right now:

* `quitarBoton()`
* multiple nested ifs
* many manual enables/disables

👉 This works… but becomes difficult to maintain.

---

# 🧠 PRO approach: centralized UI update

Instead of:

* manually enabling/disabling everywhere

Create ONE function:

```js id="f9z6nq"
function actualizarBotones() {

    btnAdd.disabled = contador >= limiteSup;
    btnAdd10.disabled = contador + 10 > limiteSup;

    btnSubst.disabled = contador <= limiteInf;
    btnSubst10.disabled = contador - 10 < limiteInf;
}
```

---

Then call it inside `mostrar()`:

```js id="7zjzhr"
function mostrar() {
    const miMarcador = document.getElementById('divResultados');

    miMarcador.innerHTML = `<p>Contador: ${contador}</p>`;

    actualizarBotones();
}
```

---

# 🚀 HUGE simplification

Then you can DELETE:

* `quitarBoton()`
* many manual button updates

Your code becomes much cleaner.

---

# ⚠️ 5. Your loops are unnecessary

You do:

```js id="whzj5l"
for (let i = 0; i < num; i++)
```

But you can simply do:

---

## ✅ Better

```js id="vwvx67"
function sumar(num) {

    if(contador + num > limiteSup){
        return;
    }

    contador += num;

    localStorage.setItem('contador', contador);

    mostrar();
}
```

---

## ✅ Same for subtract

```js id="p7l0jx"
function restar(num) {

    if(contador - num < limiteInf){
        return;
    }

    contador -= num;

    localStorage.setItem('contador', contador);

    mostrar();
}
```

---

# 🧠 Why this is better

Instead of:

* incrementing 10 times

You:

* directly modify value once

This is:

* cleaner ✅
* faster ✅
* easier to debug ✅

---

# 🇬🇧 English corrections

### ❌ Your text:

> "the tap"

### ✅ Correct:

* "the tab"

---

### ❌ Your text:

> "doesn't start from cero"

### ✅ Correct:

* "doesn't start from zero"

---

### ✨ Better version:

> "If you close the browser tab and open it again, the counter keeps its previous value."

---

# 🇪🇸 Vocabulary

* maintainable → mantenible
* reusable → reutilizable
* typo → error tipográfico
* nested → anidado

---

# 🧩 Simple English

> Your code works better now because you reuse the same functions for +1, +10, -1 and -10.

---

# 🚀 You are now approaching junior-level logic

The next professional step would be:

1. Create a `render()` function
2. Separate:

   * state
   * logic
   * UI
3. Avoid repeating DOM queries

That’s the beginning of:

* React mindset
* component thinking
* scalable frontend architecture

I can guide you there step by step if you want.
