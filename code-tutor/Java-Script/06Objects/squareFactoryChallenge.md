# 🗺️ Road Map: The Square Factory Challenge

### Step 1: The Skeleton (HTML/CSS)
- Create a container `div` with `position: relative`.
- Create 4 square `divs` with `position: absolute` and unique IDs.

### Step 2: The Blueprint (Class Definition)
- Define `class CrearCuadrado`.
- In `constructor(identi)`, capture the element and set `this.esArrastrado = false`.

### Step 3: The Wiring (Listeners)
- Attach `mousedown` to the element.
- Attach `mousemove` and `mouseup` to the `window`.
- **CRITICAL:** Use arrow functions `() =>` to keep `this` context.

### Step 4: The Logic (Methods)
- **isDraggingLogic**: Turn the switch ON, change colors/Z-index.
- **mouseMoveLogic**: If switch is ON, update `left` and `top`. Use offsets (-25px) to center the mouse.
- **pararArrastre**: Turn the switch OFF, reset visuals.

### Step 5: The Ignition (Instances)
- Create the 4 squares: `const c1 = new CrearCuadrado('id')`.
- Call any initialization methods (like `posicionInicio`).