# 📔 OOP Error Log & Logic Checks

## 🚫 Common Mistakes
1. **The "Brain vs. Body" Confusion**: Trying to change CSS on `this` instead of `this.elemento`. Remember: `this` is the JS object; `this.elemento` is the HTML tag.
2. **Missing `this.` Prefix**: Calling a class method like a regular function. 
   - *Wrong:* `window.addEventListener('mouseup', pararArrastre);`
   - *Right:* `window.addEventListener('mouseup', () => this.pararArrastre());`
3. **Property Name Mismatch**: Defining `this.esArrastrado` but checking `if(isDragging)`. 
4. **Ghost Code Blockage**: Leaving old code that references non-existent HTML IDs (like `cajaAmarilla`). This crashes the script before the Class can run.
5. **Coordinate Jumps**: Forgetting that `clientX` is relative to the whole screen. Use `container.getBoundingClientRect()` to offset the position inside a relative box.

## ❓ Logic FAQ
- **Why `window` for move/up?** To keep the "connection" if the mouse moves faster than the box.
- **Why `constructor` for listeners?** To "wire up" the box the exact millisecond it is created.
- **Is `mouseup` the Moment of Truth?** Yes. It's where you stop moving and check if you "won" (e.g., reached a target).