You’re mixing a few things here, and that’s why your exercise isn’t really doing what the task asks. Let’s fix it step by step.

---

## ❌ What’s wrong in your code

### 1. This doesn’t return anything useful:

```js
const misEnlaces = document.getElementsByClassName("a");
```

👉 There is **no element with class `"a"`** in your HTML.

---

### 2. You’re running code immediately

```js
alert(myHref);
```

👉 This runs as soon as the page loads, **not when the button is clicked**.

---

### 3. Missing function

Your button calls:

```html
onclick="conseguirAtributos()"
```

But you never defined that function ❌

---

## ✅ What the exercise really wants

You must extract these attributes from the link:

* `href`
* `hreflang`
* `rel`
* `target`
* `type`

---

## ✅ Correct solution

Here’s the clean and working version:

```html
<script>
function conseguirAtributos() {
    const enlace = document.getElementById("w3r");

    const href = enlace.getAttribute("href");
    const hreflang = enlace.getAttribute("hreflang");
    const rel = enlace.getAttribute("rel");
    const target = enlace.getAttribute("target");
    const type = enlace.getAttribute("type");

    alert(
        "href: " + href + "\n" +
        "hreflang: " + hreflang + "\n" +
        "rel: " + rel + "\n" +
        "target: " + target + "\n" +
        "type: " + type
    );
}
</script>
```

---

## 💡 Important concept

### 🔹 `.href` vs `.getAttribute("href")`

* `enlace.href` → gives the **full absolute URL**
* `getAttribute("href")` → gives the **exact value written in HTML**

👉 For this exercise, **use `getAttribute()`** ✔

---

## 🧠 Cleaner version (more modern)

```js
function conseguirAtributos() {
    const enlace = document.querySelector("#w3r");

    ["href", "hreflang", "rel", "target", "type"].forEach(attr => {
        console.log(attr + ": " + enlace.getAttribute(attr));
    });
}
```

---

## 🚀 Summary

* ❌ Don’t use `getElementsByClassName` if no class exists
* ❌ Don’t run code outside the function
* ✅ Use `getElementById("w3r")`
* ✅ Use `getAttribute()` for each attribute
* ✅ Put everything inside `conseguirAtributos()`

---

If you want, next step I can show you how to display this in the DOM instead of using `alert()` (more real-world frontend style).
