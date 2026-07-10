# Hover Highlight on Destino Items

## CSS Changes

Problems with original CSS:
- `div2` → `#div2` (ID selector needs `#`)
- `::hover` → `:hover` (single colon, pseudo-class)
- Hover on container highlights everything — need individual items

Fixed CSS:
```css
#div2{
    border: 6px solid rebeccapurple;
    border-radius: 10px;
    padding: 10px;
}
.destino-item{
    cursor:pointer;
    padding:4px;
    border-radius:4px;
    transition: background 0.2s;
}
.destino-item:hover{
    background: #ffeb3b;
    font-weight:bolder;
    font-size:24px;
    color:red;
}
```

## JS Changes (renderCatalogo)

Before (items as plain text separated by `<br>`):
```js
`${i+1}, Destino: ${item.destino}, Continente: ${item.continente}`
).join("<br>");
```

After (each item wrapped in its own hoverable `<div>`):
```js
`<div class="destino-item" data-indice="${i}">${i+1}. ${item.destino}, ${item.continente}</div>`
).join("");
```

Now each item is individually hoverable — only the item under the cursor highlights.
