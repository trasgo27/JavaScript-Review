You're very close—your logic is actually good 👍 The issue is how you're handling the `event`.

### 🚨 Problem

In your HTML:

```html
<form id="form1" onsubmit="getFormvalue()">
```

You're calling `getFormvalue()` **without passing the event**, so inside your function, `event` is `undefined`.

---

### ✅ Fix 1 (simplest)

Pass the event properly:

```html
<form id="form1" onsubmit="getFormvalue(event)">
```

---

### ✅ Fix 2 (better practice)

Instead of inline HTML events, use JavaScript:

```html
<form id="form1">
```

```javascript
document.getElementById("form1").addEventListener("submit", getFormvalue);

function getFormvalue(event){
    event.preventDefault();

    var miForm = document.getElementById("form1");
    let longi = miForm.length;

    for(let i = 0; i < longi; i++){
        if(miForm.elements[i].type === "text"){
            console.log(miForm.elements[i].value);
        }
    }
}
```

---

### 💡 Even cleaner approach (more readable)

Instead of looping, directly access the fields:

```javascript
function getFormvalue(event){
    event.preventDefault();

    const form = document.getElementById("form1");

    const firstName = form.elements["fname"].value;
    const lastName = form.elements["lname"].value;

    console.log(firstName);
    console.log(lastName);
}
```

---

### 🧠 Key Learning

* `event.preventDefault()` stops the page from reloading
* Forms pass the event **only if you explicitly include it**
* Accessing elements by `name` is cleaner than looping

---

If you want, I can turn this into a small exercise where you print the values on the page instead of the console (more real-world frontend behavior).
