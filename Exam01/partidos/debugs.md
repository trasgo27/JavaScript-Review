# Click-to-Disappear Explanation

```js
div2.addEventListener('click', (e) => {
    const elemento = e.target.closest('.anyadidos');
    if (!elemento) return;
    elemento.remove();
});
```

- **`div2.addEventListener('click', ...)`** — attaches a click listener to the parent container. Thanks to **event bubbling**, a click on any child element (the colored boxes) bubbles up to `div2`, so we only need one listener instead of one per box.

- **`e.target.closest('.anyadidos')`** — `e.target` is the exact element that was clicked. `.closest('.anyadidos')` walks up the DOM tree from that target until it finds an ancestor (or the element itself) matching the `.anyadidos` selector. This is safer than just using `e.target` directly — if the click lands on a border or inner element, it still finds the right box.

- **`if (!elemento) return;`** — if the click didn't land on or inside an `.anyadidos` element (e.g. clicking the background of `div2`), do nothing.

- **`elemento.remove()`** — removes the element from the DOM, making it disappear instantly.

The original code tried `partidos.splice(indice-1, 1)` on a NodeList (`querySelectorAll` result). NodeLists are array-like but don't have a `.splice()` method — that's an Array method. And even if it did work, splicing an array doesn't remove the element from the page; you'd still need to call `.remove()` or `.parentNode.removeChild()`.

# Re-indexing After Removal

**`mouseover` / `mouseout`** — Now use `e.target.closest('.anyadidos')` and set `textContent` directly on the hovered element. No dependency on `data-indice` or NodeList indexing, so stale indices can't break them. Also removed the broken `if(indice === NaN)` check (NaN is never equal to itself).

**Click handler** — After `elemento.remove()`, calls `reindexar()` which loops through all remaining `.anyadidos` elements and assigns sequential `data-indice` values (1, 2, 3...). Then `contador` is updated to match the actual count, so `div3` shows the correct number.

The old code had leftover issues: a stray `const partidos = []`, `partidos.remove(elemento)` (doesn't exist on NodeList), and `contador--` that could go negative. All cleaned up.
