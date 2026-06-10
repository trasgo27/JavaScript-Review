To organize your exercises like this, you can set up a simple index page that acts as a dashboard.

Here is how you can structure the files and write the HTML to link all your JavaScript exercise files together.

### 1. Your Folder Structure 📁

To make the links work easily, keep all your files in the same project folder.<br>It should look like this:

```text
mi-proyecto-js/
│
├── index.html
├── 01-remover-duplicados.js
├── 02-map-vs-set.js
├── 03-sort-edades.js
└── 04-sort-nombres.js

```

---

### 2. The `index.html` File 📄

Inside your `index.html`, you will use anchor tags (`<a>`) to link to each JavaScript file.

Because web browsers cannot run raw `.js` files directly by clicking a link, we will link them as text documents.<br>This way you can open them up in the browser, see your clean code, and open the browser console (`F12`) to see them run.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Ejercicios de JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f9;
        }
        h1 {
            color: #333;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
            background: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        a {
            text-decoration: none;
            color: #0076ff;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        p.enunciado {
            margin: 8px 0 0 0;
            font-size: 14px;
            color: #555;
            line-height: 1.4;
        }
    </style>
</head>
<body>

    <h1>Panel de Ejercicios JavaScript</h1>
    <p class="enunciado">Haz clic en cualquier ejercicio para ver el código fuente en el navegador:</p>

    <ul>
        <li>
            <a href="01-remover-duplicados.js" target="_blank">Ejercicio 1: Eliminar Duplicados (Set y Spread)</a>
            <p><strong>1.</strong> Crea un array con números repetidos.<br>Usa Set y el operador spread para eliminar duplicados.<br>Muestra el resultado.</p>
        </li>
        <li>
            <a href="02-map-vs-set.js" target="_blank">Ejercicio 2: Uso de Map Object y Métodos</a>
            <p><strong>2.</strong> Crea un Map con nombres y edades.<br>Practica los métodos set, get, has, delete y forEach.<br>Comprueba el funcionamiento de cada uno.</p>
        </li>
        <li>
            <a href="03-sort-edades.js" target="_blank">Ejercicio 3: Ordenar Números (Edades Ascendente/Descendente)</a>
            <p><strong>3.</strong> Crea un array de objetos con nombres y edades.<br>Ordénalos por edad ascendente y descendente.<br>Usa el método sort con una función comparadora.</p>
        </li>
        <li>
            <a href="04-sort-nombres.js" target="_blank">Ejercicio 4: Ordenar Strings (Nombres y localeCompare)</a>
            <p><strong>4.</strong> Usa el mismo array del ejercicio anterior.<br>Ordénalos por nombre alfabéticamente.<br>Usa localeCompare para la comparación de strings.</p>
        </li>
    </ul>

</body>
</html>

```

### Tips for execution:

* **`target="_blank"`**: This attribute forces the browser to open the JavaScript file in a brand-new tab, keeping your index dashboard open in the background.
* **Running the code**: If you want the JavaScript code to actually execute inside this HTML page instead of just reading it, you can add `<script src="01-remover-duplicados.js"></script>` to the bottom of the HTML file right before the `</body>` tag. 

---

You have hit the exact limitation of standard script tags. You are 100% correct.

If you load multiple separate JavaScript files into a single HTML file using standard `<script>` tags, they will absolutely overlap.<br>Because they all share the exact same global space (the `window` object), you will run into two major problems:

1. **Naming Collisions:** If Exercise 1 has `const data = [...]` and Exercise 3 also has `const data = [...]`, your browser will crash with a `SyntaxError: Identifier 'data' has already been declared`.
2. **Polluted Console:** When the page loads, every single file will run simultaneously, causing all your `console.log()` statements to mix together in a chaotic mess.

To solve this and keep your exercises completely isolated from one another, you have two excellent choices depending on how you prefer to work:

---

### Option A: The "One Page to Rule Them All" (Dynamic Loading)

Instead of hardcoding all the scripts into the HTML at once, you can write a tiny piece of JavaScript inside your `index.html` that **only loads the specific exercise you click on**.<br><br>This keeps your console perfectly clean and completely prevents variables from overlapping because only one file ever runs at a time.

Here is how you update the `index.html` to do this:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Consola de Ejercicios JS</title>
    <style>
        body { font-family: sans-serif; margin: 30px; background: #f4f4f9; }
        button { 
            display: block; margin: 10px 0; padding: 10px; 
            width: 300px; text-align: left; cursor: pointer; 
            background: white; border: 1px solid #ddd; border-radius: 4px;
        }
        button:hover { background: #eef; }
    </style>
</head>
<body>

    <h1>Mis Ejercicios JS</h1>
    <p>Haz clic en un botón para ejecutar ese ejercicio en la Consola (F12):</p>

    <button onclick="cargarEjercicio('01-remover-duplicados.js')">1. Eliminar Duplicados</button>
    <button onclick="cargarEjercicio('03-sort-edades.js')">2. Ordenar por Edades</button>
    <button onclick="cargarEjercicio('04-sort-nombres.js')">3. Ordenar por Nombre</button>

    <script>
        function cargarEjercicio(nombreArchivo) {
            // Clear the console so previous results disappear
            console.clear();
            console.log(`--- Ejecutando: ${nombreArchivo} ---`);

            // Remove any previously loaded exercise script to prevent memory bloating
            const scriptViejo = document.getElementById('script-ejercicio');
            if (scriptViejo) scriptViejo.remove();

            // Create and inject a brand new script tag dynamically
            const nuevoScript = document.createElement('script');
            nuevoScript.src = nombreArchivo;
            nuevoScript.id = 'script-ejercicio';
            
            document.body.appendChild(nuevoScript);
        }
    </script>
</body>
</html>

```

---

### Option B: The ES Modules Approach (Modern JS Isolation)

If you turn your files into **Modules**, JavaScript automatically isolates them.<br>Variables declared inside a module *never* leak into the global space, meaning you can have `const data` in every single file and they will never collide.

To do this, you just add `type="module"` to your script tags in the HTML:

```html
<script type="module" src="01-remover-duplicados.js"></script>
<script type="module" src="03-sort-edades.js"></script>

```

> **The Catch with Option B:** While this fixes the variable collisions perfectly, all your `console.log()` statements will still fire at the exact same moment when the page loads,<br>making the console output messy.

### Which one fits your workflow better?

If you want total control over what prints to your console, **Option A** turns your dashboard into an interactive controller.

---

## Summary: The Three Approaches

| Approach | How it works | Executes code? | Console clean? | Scope isolation? |
|---|---|---|---|---|
| **1. Read-Only Dashboard** | `<a href="file.js" target="_blank">` opens JS as text in a new tab | ❌ No | ✅ N/A | ✅ Each file in its own tab |
| **2. Dynamic Loading (Option A)** | Buttons call `cargarEjercicio()` which injects a `<script>` tag dynamically | ✅ Yes | ✅ Clears on each click | ✅ Only one file runs at a time |
| **3. ES Modules (Option B)** | `<script type="module" src="...">` loads files as modules | ✅ Yes | ❌ All logs fire on load | ✅ Each module has its own scope |

### Quick code comparison

**1. Read-Only:**
```html
<a href="01-ejercicio.js" target="_blank">Ejercicio 1</a>
```

**2. Dynamic Loading:**
```html
<button onclick="cargarEjercicio('01-ejercicio.js')">Ejercicio 1</button>

<script>
function cargarEjercicio(nombre) {
    console.clear();
    const old = document.getElementById('script-ejercicio');
    if (old) old.remove();
    const s = document.createElement('script');
    s.src = nombre;
    s.id = 'script-ejercicio';
    document.body.appendChild(s);
}
</script>
```

**3. ES Modules:**
```html
<script type="module" src="01-ejercicio.js"></script>
<script type="module" src="02-ejercicio.js"></script>
```
