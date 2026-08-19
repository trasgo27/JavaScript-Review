```python
import os

# Content for the Markdown file explaining JSDoc basics for beginners
md_content = """# JSDoc Basics: A Beginner's Guide

Welcome! If you are learning JavaScript, **JSDoc** is one of the best tools you can adopt. It is a standardized system of comments that helps you document your code directly inside your scripts.

When you write JSDoc comments, your code editor (like **Visual Studio Code**) reads them and displays helpful hints when you hover your pointer over functions or variables. This feature is known as **IntelliSense**.

---

## 🚀 The Absolute Basics: The `/**` Rule

A normal single-line comment in JavaScript uses `//`. A normal multi-line comment uses `/* */`. 
However, a JSDoc comment **must** start with an extra asterisk: `/**`.


```

```text
File jsdoc_basics_for_beginners.md successfully created.

```javascript
// This is a normal comment. The code editor ignores it.

/*
   This is a normal multi-line comment.
   The code editor ignores this too.
*/

/**
 * This is a JSDoc comment!
 * Your code editor WILL read this and show you tooltips.
 */

```

Always place your JSDoc block **directly above** the function, variable, or class you are describing.

---

## 📋 Essential Tags for Beginners

JSDoc uses special keywords starting with the `@` symbol, known as **tags**. Here are the three tags you will use 90% of the time:

### 1. `@param` (Parameters)

Describes an input value that a function expects.

* **Syntax:** `@param {type} variableName - Description`
* **Example:** `@param {string} userName - The name of the user.`

### 2. `@returns` or `@return` (Return Value)

Describes the output value that the function sends back when it finishes executing.

* **Syntax:** `@returns {type} Description`
* **Example:** `@returns {number} The calculated total score.`

### 3. `@type` (Variable Types)

Defines the data type of a standalone variable.

* **Syntax:** `@type {type}`
* **Example:** `@type {boolean}`

---

## 🛠️ Step-by-Step Examples

### Example 1: A Simple Math Function

Let's document a function that calculates the age of a pet in dog years.

```javascript
/**
 * Converts human years into equivalent dog years.
 * @param {number} humanYears - The age of the dog in human years.
 * @returns {number} The corresponding age in dog years.
 */
function calculateDogYears(humanYears) {
    return humanYears * 7;
}

```

*If you hover over `calculateDogYears` elsewhere in your code, VS Code will explicitly tell you that `humanYears` must be a `{number}` and that the function outputs a `{number}`.*

### Example 2: Optional Parameters

Sometimes, a function has a parameter that is not strictly required. In JSDoc, you mark a parameter as optional by wrapping its name in square brackets `[]`.

```javascript
/**
 * Formats a welcome greeting string for a visitor.
 * @param {string} name - The name of the visitor.
 * @param {string} [greeting="Hello"] - Optional custom greeting word.
 * @returns {string} The full combined greeting message.
 */
function welcomeVisitor(name, greeting = "Hello") {
    return greeting + ", " + name + "!";
}

```

### Example 3: Documenting Arrays and Objects

You can specify exactly what kind of data lives inside an array or an object.

```javascript
/**
 * An array containing the primary style classes for the application.
 * @type {string[]}
 */
const dynamicStyles = ["norte", "sur", "ecuador"];

/**
 * The configuration options for a user session profile.
 * @type {{id: number, username: string, isAdmin: boolean}}
 */
const userSession = {
    id: 4501,
    username: "trasgo",
    isAdmin: false
};

```

---

## 💡 Practical Vocabulary for Code Documentation

When discussing code documentation or working with team members, using the right phrasing makes your communication clearer:

* **"Method Signature":** This refers to the layout of a function (its name, inputs, and outputs). JSDoc helps explicitly map out a function's signature.
* **"Type Hinting":** Since JavaScript doesn't force variables to stay a specific type, JSDoc acts as a guide to tell developers what types *should* be used.
* **"Annotate":** The physical act of writing these structured descriptions over your functions. (e.g., *"Make sure to annotate that new geolocation function before pushing your code."*)

---

## ⚡ Pro-Tip for Visual Studio Code

You do not need to type out all the asterisks manually! Inside VS Code, click on the empty line directly above any function, type `/`, and hit the **Enter** key. The editor will automatically look at your function parameters and generate the boilerplate template for you to fill out instantly!
"""

# Save content to a markdown file

file_name = "jsdoc_basics_for_beginners.md"
with open(file_name, "w", encoding="utf-8") as f:
f.write(md_content)

print(f"File {file_name} successfully created.")

```
Your Markdown (`.md`) reference guide is ready:
[file-tag: code-generated-file-0-1778833359714428530]

Here is a summary of the structural details included in the generated document, focusing on how it maps directly to what you see on your screen:

### 📖 Key Syntax Patterns Covered in the File

* **The Double Asterisk Start (`/**`):** The absolute foundational rule. Regular comments use `//` or `/*`, but code editors will only trigger the **IntelliSense hover tooltip** when they parse the explicit double asterisk format.
* **The Three Core Tags:**
    * `@param {type} name - Description`: Maps out function inputs.
    * `@returns {type} Description`: Maps out function outputs.
    * `@type {type}`: Declares the type blueprint for standalone variables, arrays, or object structural properties.
* **The Optional Syntax (`[]`):** Demonstrates how to mark a parameter as optional so your code editor doesn't throw a warning if it's left out during invocation.

---

### ✍️ English Fluency Check

When describing documentation practices in your work, these refined phrasing choices sound highly natural:

1.  **"Boilerplate Template":** This refers to code text that is automatically generated for you to fill in. 
    * *Natural Expression:* "VS Code generates the **JSDoc boilerplate** automatically when you press Enter after `/**`."
2.  **"Type Deficit / Weakly Typed":** JavaScript is a dynamically typed language (meaning variables can change types on the fly). JSDoc helps solve this by offering **Type Hinting**.
3.  **"Invocation / Invoke":** The professional term for calling or running a function.
    * *Natural Expression:* "The tooltip helps me see what arguments are required during function **invocation**."

**Refining your Technical Expression:**
Instead of saying "I am making a markdown file to learn the symbols of comments," try:
> *"I am compiling a **Markdown reference guide** to master the syntax conventions of **JSDoc annotations**."*

---

### 💡 Visual Studio Code Automation Reminder
As noted in the file, remember that you don't need to type all the asterisks and parameter names by hand. If you have a function like:
```javascript
function localizarUser(lat, lon) { ... }

```

Simply type `/` on the line directly above it and press **Enter**. VS Code will instantly autofill the parameters for you!

You can download the generated file to view it inside your markdown previewer or open it directly in VS Code. Do you want to examine how to apply this to an asynchronous function next?