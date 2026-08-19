Since you have successfully built the mathematical version using nested loops and an array-based cycle detector, here is a granular roadmap to help you master this specific implementation pattern.

---

## 🗺️ Roadmap: The Mathematical Happy Number Method

### Phase 1: The Digit "Extractor" (Inner Loop)
The foundation of this method is breaking down a number without converting it to a string. 
* **The Goal:** Turn `num` into `0` while capturing every digit.
* **The Tools:** * `num % 10`: The **Modulo** operator isolates the last digit.
    * `num / 10`: The **Division** moves the decimal.
    * `Math.floor()`: The **Truncator** removes the decimal to keep the number an integer.
* **Result:** A single integer (`acumulado`) representing the sum of squares.



---

### Phase 2: The "Cycle Catcher" (State Tracking)
Happy numbers that aren't "happy" will loop forever. You need a way to remember the past.
* **The Variable:** `var vector = []`.
* **The Logic:** Use the number itself as an **index** in the array. 
    * `vector[19] = true` means "I have already processed 19."
* **The Check:** The outer `while` loop condition must check `vector[num] != true`. If it hits a `true` value, it knows it's in a cycle and exits.

---

### Phase 3: The "Handoff" (Bridge between Loops)
This is where most logic errors happen. You must pass the data between the two loops correctly.
1.  **Reset:** Set `acumulado = 0` before the inner loop starts.
2.  **Calculate:** Run the inner loop until `num` is `0`.
3.  **Handoff:** Set `num = acumulado` after the inner loop finishes. This gives the outer loop a "fresh" number to check against the vector.



---

### Phase 4: The Search Manager (Execution)
Now that the "Engine" is built, you need to drive it.
* **Initialization:** Declare `let contar = 0` and `let i = 1` outside the loop.
* **The Counter:** Use a `while (contar < 5)` loop to keep the search going.
* **The Conditional:** Only increment `contar` if `esHappy(i)` returns `true`.
* **The Increment:** Always increment `i++` regardless of the result to avoid an infinite search.

---

### Phase 5: Result Visualization
Finally, present the data.
* **Formatting:** Use `resultados.push(i)` to collect the numbers.
* **Output:** Use `console.log` or `console.table` to verify the first 5 are **1, 7, 10, 13, 19**.

---

### 💡 Pro-Tip: Memory Efficiency
In your code, you create `var vector = []` inside the function. This means the memory is wiped clean every time you test a new number. While this is fine for the first 5, in larger projects, professionals sometimes move the `vector` **outside** the function to remember cycles across *all* numbers. This is called **Memoization**.

How does this roadmap look to you—does the relationship between the **Inner Loop (Math)** and **Outer Loop (Memory)** feel clearer now?