# Guia: Como Crear Componentes en Angular

## Que es un componente?

Un componente es una **cajita autonoma** que contiene:
- Su **HTML** (como se ve)
- Su **CSS** (como se estiliza)
- Su **TypeScript** (como se comporta)

Cada pantalla, boton o seccion de una app Angular es un componente.

---

# Parte 1: Fundamentos — Node.js, npm y Angular CLI

## Node.js — El motor que ejecuta JavaScript fuera del navegador

**Node.js** (o simplemente **Node**) es un runtime de JavaScript construido sobre el motor V8 de Chrome. Te permite correr JavaScript en tu computadora, no solo en el navegador.

| Aspecto | Detalle |
|---|---|
| Que es | Runtime de JavaScript (no es un framework) |
| Creado por | Ryan Dahl (2009) |
| Motor | Google V8 (el mismo de Chrome) |
| Package manager | npm (viene con Node) |
| Instalar | https://nodejs.org |
| Verificar | `node -v` y `npm -v` |

### Node.js NO es:

- **No es un framework** — Express, NestJS, Angular son frameworks que corren SOBRE Node
- **No es un navegador** — no tiene DOM, window ni document
- **No es solo para servidores** — tambien se usa para CLI tools, build tools, apps de escritorio (Electron)

---

## npm — El gestor de paquetes de JavaScript

**npm** (Node Package Manager) es la herramienta que viene con Node.js para **descargar, compartir y gestionar paquetes** (librerias, herramientas, frameworks).

### Que es un "paquete"?

Un paquete es un codigo pre-escrito por otra persona que puedes usar sin construirlo desde cero:

- **Express** — framework de servidores web
- **Angular** — el framework que estas aprendiendo
- **Lodash** — funciones de utilidad
- **Moment.js** — manejo de fechas

### Comandos basicos de npm

| Comando | Que hace |
|---|---|
| `npm install express` | Descarga un paquete en tu proyecto |
| `npm install -g @angular/cli` | Instala un paquete **globalmente** (disponible en todas partes) |
| `npm init` | Crea un archivo `package.json` (manifiesto del proyecto) |
| `npm start` | Ejecuta el script "start" definido en `package.json` |
| `npm run dev` | Ejecuta un script personalizado |

### package.json — El manifiesto de tu proyecto

Este archivo lista todas las dependencias y scripts del proyecto:

```json
{
  "name": "mi-primera-app",
  "dependencies": {
    "@angular/core": "^21.0.0",
    "rxjs": "^7.8.0"
  },
  "scripts": {
    "start": "ng serve",
    "build": "ng build"
  }
}
```

### Analogia simple

Piensa en npm como una **tienda de aplicaciones para codigo**:

| npm | Analogia |
|---|---|
| npm registry | La tienda (https://www.npmjs.com — millones de paquetes) |
| npm install | Descargar una app |
| package.json | Tu lista de apps instaladas |
| node_modules | La carpeta donde se guardan las apps |

---

## Angular CLI — La herramienta de linha de comandos

**Angular CLI** (`ng`) es una herramienta que te genera proyectos, componentes, servicios y mas **sin crear archivos a mano**.

### Instalacion

```bash
npm install -g @angular/cli
```

Esto instala `ng` en tu sistema globalmente. Verifica:

```bash
ng version
```

### Comandos basicos de Angular CLI

| Comando | Que hace |
|---|---|
| `ng new mi-app` | Crea un proyecto Angular nuevo |
| `ng g c mi-componente` | Genera un componente |
| `ng g s mi-servicio` | Genera un servicio |
| `ng serve` | Ejecuta la app en modo desarrollo |
| `ng build` | Compila la app para produccion |

> `ng g c` es la forma corta de `ng generate component`. Es lo que usaras el 99% del tiempo.

---

# Parte 2: Configuracion del entorno

## Paso 1 — Crear un proyecto Angular nuevo

```bash
cd D:\000Repo\000Codigo\000Angular_Qwen
ng new mi-primera-app
```

Respuestas al CLI:

| Pregunta | Respuesta |
|---|---|
| *Which stylesheet format?* | **CSS** (Enter) |
| *Do you want SSR/SSG?* | **No** (N + Enter) |
| *Route?* | **No** (por ahora) |

```bash
cd mi-primera-app
ng serve
```

Abre http://localhost:4200 en tu navegador.

---

# Parte 3: Crear y usar componentes

## Generar un componente con Angular CLI

```bash
ng g c hola
```

Esto genera una carpeta `src/app/hola/` con archivos:

```
src/app/hola/
├── hola.ts           ← Logica (TypeScript)
├── hola.html         ← Template (HTML)
├── hola.css          ← Estilos
└── hola.spec.ts      ← Tests (ignorar por ahora)
```

> **Nota Angular 21:** Los archivos ahora se llaman `hola.ts` en vez de `hola.component.ts`. Angular 21 uso nombres mas cortos.

---

## Estructura de un componente

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hola',          // Como lo "llamas" en HTML
  imports: [],                    // Dependencias que usa
  templateUrl: './hola.html',    // Archivo HTML externo
  styleUrls: ['./hola.css']      // Archivo CSS externo
})
export class HolaComponent {

}
```

| Elemento | Que es |
|---|---|
| `@Component({})` | Decorador. Le dice a Angular: "Esta clase es un componente" |
| `selector: 'app-hola'` | El "nombre HTML". Usas `<app-hola></app-hola>` |
| `imports: []` | Dependencias del componente (Componentes, Directivas, etc.) |
| `templateUrl` | Ruta al archivo `.html` con el template |
| `styleUrls` | Ruta(s) a archivos `.css` |

> **Nota Angular 21:** No necesitas `standalone: true` porque ya es el default.

---

## Usar el componente en la app

### Importar en el componente padre

Edita `src/app/app.ts`:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HolaComponent } from './hola/hola';  // ANADE ESTO

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HolaComponent],  // ANADE ESTO
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-primera-app');
}
```

### Usar el selector en el template

Edita `src/app/app.html` (borra todo):

```html
<app-hola></app-hola>
```

### Ver el resultado

Si `ng serve` sigue corriendo, Angular detecta los cambios automaticamente.

---

# Parte 4: Ejercicios resueltos

## Ejercicio 1 — Mi primer componente "Hola Mundo"

**Dificultad:** Facil | **Concepto:** Decorador @Component

**Objetivo:** Crear un componente que muestre "Hola Angular!".

```bash
ng g c hola
```

Edita `hola.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hola',
  imports: [],
  template: `<h1>Hola Angular!</h1>`
})
export class HolaComponent {}
```

**Reto — Anade tu nombre:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hola',
  imports: [],
  template: `
    <h1>Hola Angular!</h1>
    <p>Mi nombre es Carlos Perez</p>
  `
})
export class HolaComponent {}
```

---

## Ejercicio 2 — Template inline vs archivo externo

**Dificultad:** Facil | **Concepto:** templateUrl y styleUrls

**Objetivo:** Entender la diferencia y crear un componente con template externo.

```bash
ng g c tarjeta
```

`tarjeta.ts` (queda como esta):

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  imports: [],
  templateUrl: './tarjeta.html',
  styleUrls: ['./tarjeta.css']
})
export class TarjetaComponent {}
```

Edita `tarjeta.html` con al menos 3 elementos:

```html
<div class="card">
  <h2>Componente con Template Externo</h2>
  <p>Este es el contenido del componente tarjeta.</p>
  <ul>
    <li>Elemento 1: Angular</li>
    <li>Elemento 2: TypeScript</li>
    <li>Elemento 3: RxJS</li>
  </ul>
  <button>Haz click aqui</button>
</div>
```

Estiliza en `tarjeta.css`:

```css
.card {
  border: 2px solid #dd0031;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: #f9f9f9;
}
```

**Cuando usar cada uno:**

| Tipo | Cuando usarlo |
|---|---|
| `template:` (inline) | Templates muy pequenos (1-3 lineas) |
| `templateUrl:` (externo) | La norma en produccion. Separa concerns |

---

## Ejercicio 3 — Propiedades e interpolacion

**Dificultad:** Medio | **Concepto:** Interpolacion `{{ }}`

**Objetivo:** Declarar propiedades y mostrarlas con `{{ }}`.

```bash
ng g c perfil
```

Edita `perfil.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  template: `
    <h2>{{ nombre }}</h2>
    <p><strong>Edad:</strong> {{ edad }}</p>
    <p><strong>Email:</strong> {{ email }}</p>
    <p><strong>Ciudad:</strong> {{ ciudad }}</p>
    <p><strong>Profesion:</strong> {{ profesion }}</p>
  `
})
export class PerfilComponent {
  nombre = 'Ana Garcia';
  edad = 28;

  // Reto: 3 propiedades extra
  email = 'ana.garcia@email.com';
  ciudad = 'Madrid';
  profesion = 'Desarrolladora Frontend';
}
```

**Que es `{{ }}`?** Se llama **interpolacion**. Angular toma el valor de la propiedad y lo "inyecta" como texto dentro del HTML.

---

## Ejercicio 4 — Metodos y event binding

**Dificultad:** Medio | **Concepto:** Event binding `(click)`

**Objetivo:** Crear metodos y llamarlos con `(click)`.

```bash
ng g c contador
```

Edita `contador.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  template: `
    <h2>Contador: {{ contador }}</h2>
    <button (click)="incrementar()">+1</button>
    <button (click)="decrementar()">-1</button>
    <button (click)="reset()">Reset</button>
  `
})
export class ContadorComponent {
  contador = 0;

  incrementar() {
    this.contador++;
  }

  decrementar() {
    this.contador--;
  }

  // Reto: Boton Reset
  reset() {
    this.contador = 0;
  }
}
```

| Sintaxis | Significado |
|---|---|
| `(click)="incrementar()"` | Event binding. Ejecuta el metodo al hacer click |
| `{{ contador }}` | Interpolacion. Muestra el valor actual |

---

## Ejercicio 5 — Ciclo de vida con ngOnInit

**Dificultad:** Dificil | **Concepto:** Lifecycle hooks

**Objetivo:** Usar `ngOnInit` y `ngOnDestroy` para manejar un intervalo.

```bash
ng g c reloj
```

Edita `reloj.ts`:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-reloj',
  imports: [],
  template: `
    <h2>Reloj en Tiempo Real</h2>
    <p>Hora actual: {{ hora }}</p>
  `
})
export class RelojComponent implements OnInit, OnDestroy {
  hora = '';
  private intervalId: any;

  ngOnInit() {
    this.actualizarHora();
    this.intervalId = setInterval(() => this.actualizarHora(), 1000);
  }

  ngOnDestroy() {
    // Reto: Limpiamos el interval para evitar memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  actualizarHora() {
    this.hora = new Date().toLocaleTimeString();
  }
}
```

**Ciclo de vida de Angular:**

| Hook | Cuando se ejecuta |
|---|---|
| `constructor()` | Angular instancia la clase (no accedas a propiedades del template) |
| `ngOnInit()` | Despues de inicializar propiedades. Seguro para HTTP, timers, etc. |
| `ngOnDestroy()` | Antes de destruir el componente. Libera recursos aqui |

---

# Parte 5: Referencia rapida

## Checklist de comandos

```bash
# Instalar Angular CLI
npm install -g @angular/cli

# Crear proyecto
ng new mi-primera-app
cd mi-primera-app

# Generar componentes (uno por ejercicio)
ng g c hola
ng g c tarjeta
ng g c perfil
ng g c contador
ng g c reloj

# Ejecutar la app
ng serve
```

## Regla de oro de Angular

> **Todo es un componente.** Cada pantalla, cada boton, cada seccion. Los componentes se anidan, se comunican, y juntos construyen tu aplicacion completa.
