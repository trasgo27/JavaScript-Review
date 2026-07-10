Of course — here’s a **clear, practical summary** you can keep as a reference.

---

# 🧠 How to Change Styles with JavaScript

## 🥇 1. Directly with `.style` (quick & simple)

👉 Modify CSS properties one by one

```js
const elem = document.getElementById("miElemento");

elem.style.color = "red";
elem.style.backgroundColor = "lightblue";
elem.style.fontSize = "20px";
```

### 🔑 Key rules:

* Use **camelCase** → `backgroundColor` (not `background-color`)
* Values must be **strings** → `"20px"`

---

## 🥈 2. Using `classList` (BEST PRACTICE)

👉 Add/remove CSS classes

### CSS:

```css
.miEstilo {
    color: red;
    font-size: 20px;
}
```

### JS:

```js
elem.classList.add("miEstilo");
```

---

### Useful methods:

```js
elem.classList.remove("miEstilo");
elem.classList.toggle("miEstilo");
```

👉 `toggle()` = add/remove automatically

---

## 🥉 3. Using `cssText` (quick overwrite)

```js
elem.style.cssText = "color: blue; font-size: 30px;";
```

👉 Replaces all inline styles

---

# 🧠 When to use each

| Method      | Use case                |
| ----------- | ----------------------- |
| `.style`    | small quick changes     |
| `classList` | real projects ✅         |
| `cssText`   | fast override / testing |

---

# ⚠️ Common mistakes

❌ Wrong:

```js
elem.classList("miClase");
```

✅ Correct:

```js
elem.classList.add("miClase");
```

---

❌ Wrong:

```js
elem.style.font-size = "20px";
```

✅ Correct:

```js
elem.style.fontSize = "20px";
```

---

# 🎯 Typical workflow

```js
function cambiarEstilo() {
    const elem = document.getElementById("miElemento");
    elem.classList.toggle("miEstilo");
}
```

👉 Clean, reusable, and scalable

---

# 🚀 Final mental model

👉 JavaScript does NOT “create styles”

It:

* **applies inline styles** (`.style`)
* OR **adds/removes CSS classes** (`classList`)

---

If you want next:
👉 I can show you how to **animate styles (fade, move, hover effects)** — that’s where this becomes really powerful.
