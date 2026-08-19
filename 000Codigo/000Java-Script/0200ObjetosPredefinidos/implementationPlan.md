# Implementation Plan - Debug and Fix `05Ej.js`

This plan addresses several bugs identified in [05Ej.js](file:///d:/00_JavaScript_Review/0200ObjetosPredefinidos/05Ej.js) that prevent correct execution and produce wrong outputs.

## Proposed Changes

### [05Ej.js](file:///d:/00_JavaScript_Review/0200ObjetosPredefinidos/05Ej.js)

1. **Fix Date Addition Logic (Line 20):**
   - **Bug:** `new Date(p.dispatchDate) + setDate(getDate()+p.transitDays)` throws `ReferenceError: setDate is not defined` and performs string concatenation.
   - **Fix:** Properly instantiate a `Date` object and use its methods to add transit days:
     ```javascript
     const expectedDelivery = new Date(p.dispatchDate);
     expectedDelivery.setDate(expectedDelivery.getDate() + Math.ceil(p.transitDays));
     ```

2. **Ensure `weightKg` is a Number (Line 26):**
   - **Bug:** `p.weightKg.toFixed(1)` returns a string representation of the weight.
   - **Fix:** Convert the output back to a Number:
     ```javascript
     weightKg: Number(p.weightKg.toFixed(1)),
     ```

3. **Fix Accumulator Reduction Logic (Lines 34-36):**
   - **Bug:** `acc += Number(act.weightKg).toFixed(2)` performs string concatenation on the accumulator and results in a malformed string output.
   - **Fix:** Correct the accumulator addition and format the final result at the console logging step:
     ```javascript
     const pesoTotal = formatear01.reduce((acc, act) => acc + act.weightKg, 0);
     ```

4. **Format Total Weight Output (Line 37):**
   - **Bug:** Currently logs a concatenated string.
   - **Fix:** Format the numeric sum to two decimal places:
     ```javascript
     console.log(`Peso Total: ${pesoTotal.toFixed(2)}`);
     ```

## Verification Plan

### Automated Verification
- Run the script with Node:
  ```powershell
  node 05Ej.js
  ```
- Verify that both tables print correctly and the output is:
  `Peso Total: 17.40`

## ✅ Final Result — All fixes applied

### Output

| Row | orderId | dispatchDate | transitDays | expectedDelivery | weightKg | zone |
|-----|---------|-------------|-------------|-----------------|----------|------|
| 0 | ID-9921 | 2026-06-01 | 3 | **4/6/2026** | **2.5** | peninsula |
| 1 | ID-4412 | 2026-06-04 | 6 | **10/6/2026** | **14.1** | baleares |
| 2 | ID-1055 | 2026-05-28 | 2 | **30/5/2026** | **0.8** | peninsula |

**`Peso Total: 17.40`** ✅

### Changes applied

| Line | Before | After |
|------|--------|-------|
| 20–22 | `new Date(p.dispatchDate + p.transitDays)` | `new Date(dispatch); setDate(getDate() + Math.ceil(...))` |
| 27 | `expectedDelivery: expectedDelivery` (raw Date) | `expectedDelivery.toLocaleDateString()` (DD/MM/YYYY) |
| 28 | `p.weightKg.toFixed(1)` (string) | `Number(p.weightKg.toFixed(1))` (number) |
| 32 | `` console.table(\`formatear01: \${formatear01}\`) `` (string) | `console.table(formatear01)` (proper table) |
| 35–36 | `return acc += Number(act.weightKg).toFixed(2)` (string concat) | `acc + act.weightKg` (number addition) |
| 37 | `pesoTotal` (raw) | `pesoTotal.toFixed(2)` (formatted) |
