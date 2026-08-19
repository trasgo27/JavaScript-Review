# Road Map: Building the Movie Database App (Step-by-Step)

This guide breaks down how to build a simplified version of the movie database application. We start from scratch with the skeleton HTML, move to the core JavaScript logic, and finish with a step-by-step breakdown of the CSS and CSS Grid layout.

---

## Step 1: The HTML skeleton

Keep it as simple as possible. We only need a container, a title, a brief instruction, and a container list element (`<ul>`) where our JavaScript will inject the movie cards.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simplified Filmoteca</title>
    <!-- Link our stylesheet -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <h1>Filmoteca Valenciana</h1>
        <p class="subtitle">Hover on a card to see the director.</p>
        
        <!-- JavaScript will render the list elements inside here -->
        <ul id="listado"></ul>
    </main>

    <!-- Link our script at the bottom so elements are loaded before it runs -->
    <script src="appPelis.js"></script>
</body>
</html>
```

---

## Step 2: The JavaScript Structure

In your script file (`appPelis.js`), define your mock data array and reference the `#listado` element from the DOM:

```javascript
const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi" },
    { id: 2, title: "The Conjuring", genre: "Horror" },
    { id: 3, title: "Pulp Fiction", genre: "Crime" },
    { id: 4, title: "It", genre: "Horror" }
];

const listado = document.getElementById('listado');
```

---

## Step 3: Simulating the Asynchronous API Call

We need a function that returns a `Promise`. A Promise represents an operation that hasn't completed yet but will in the future (using `setTimeout`).

```javascript
function fetchDirector(movie) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Horror genre rejects (fails), others resolve (succeed)
            if (movie.genre !== "Horror") {
                resolve("Christopher Nolan");
            } else {
                reject(new Error("Director CONFIDENCIAL"));
            }
        }, 800); // Wait 800ms to simulate network request latency
    });
}
```

---

## Step 4: Rendering Cards & Closures

Instead of writing a giant string of HTML using `innerHTML`, we build the elements using standard DOM methods (`document.createElement`). This is safer, more performant, and allows us to store the movie object reference directly on the element.

```javascript
function pintar() {
    listado.innerHTML = ""; // Clear list before rendering

    movies.forEach((movie) => {
        // Create the card container
        const card = document.createElement('li');
        card.className = 'movie-card';
        
        // KEY ELEMENT: Store the whole object reference on the DOM node itself
        card.movie = movie;

        // Create elements inside the card
        const title = document.createElement('h2');
        title.textContent = movie.title;

        const infoSpan = document.createElement('span');
        infoSpan.className = 'director';
        infoSpan.textContent = "Hover to reveal director";

        // Assemble cards
        card.appendChild(title);
        card.appendChild(infoSpan);

        // Add interactive hover event
        // Closure Concept: The listener "remembers" the "movie" and "infoSpan" variables
        // from the current iteration of the loop! No need for 'this'.
        card.addEventListener('mouseenter', () => {
            infoSpan.textContent = "Fetching director...";
            
            fetchDirector(movie)
                .then((directorName) => {
                    infoSpan.textContent = `Director: ${directorName}`;
                })
                .catch((error) => {
                    infoSpan.textContent = `⚠️ ${error.message}`;
                    infoSpan.style.color = "red"; // Visual cue for error
                });
        });

        // Reset text when mouse leaves
        card.addEventListener('mouseleave', () => {
            infoSpan.textContent = "Hover to reveal director";
            infoSpan.style.color = ""; // Resets color back to CSS default
        });

        // Inject the completed card into the list
        listado.appendChild(card);
    });
}

// Call function when the document is ready
document.addEventListener('DOMContentLoaded', pintar);
```

---

## Step 5: Visual Styling and CSS Grid (Deep Dive)

Let's break down the CSS, particularly the **Grid layout** and card structure.

### 5.1 CSS Grid Layout Explained
CSS Grid is used to place elements in columns and rows. Here is the CSS for our list layout:

```css
#listado {
    list-style: none; /* Removes the default bullet points */
    display: grid;    /* Turns this element into a grid container */
    
    /* 
       By default (on mobile/small screens), we have 1 column. 
       All grid items will stack on top of each other.
    */
    grid-template-columns: 1fr; 
    gap: 1.25rem;     /* Adds a 20px space between each card */
}

/* 
   Media Query: When the screen width is 640px or wider, 
   we change the layout from 1 column to 2 columns.
*/
@media (min-width: 640px) {
    #listado {
        /* 
           1fr means 'one fractional unit'.
           '1fr 1fr' means we want two columns of exactly equal widths.
           CSS will automatically divide the remaining space into two.
        */
        grid-template-columns: 1fr 1fr; 
    }
}
```

### 5.2 Card Elements Styling
We style individual cards to look like floating glassmorphism panels.

```css
.movie-card {
    background: rgba(255, 255, 255, 0.03); /* Translucent white background */
    border: 1px solid rgba(255, 255, 255, 0.08); /* Semi-transparent border */
    border-radius: 12px; /* Smooth rounded corners */
    padding: 1.5rem; /* Internal padding inside the card */
    cursor: pointer;
    
    /* Transition allows visual changes to animate smoothly over 0.3 seconds */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.movie-card:hover {
    background: rgba(255, 255, 255, 0.07); /* Brightens background on hover */
    border-color: #6366f1; /* Changes border color to purple */
    transform: translateY(-4px); /* Moves the card up slightly (3D lift effect) */
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); /* Glow shadow effect */
}
```

### 5.3 Global Page Setup (Flexbox Centering)
To place our main container perfectly in the center of the viewport, we use Flexbox on the `body`:

```css
body {
    background: #0f172a; /* Slate dark background */
    color: #f8fafc; /* Near white text color */
    min-height: 100vh; /* Make body cover full screen height */
    
    /* Flexbox setup to center the container vertically and horizontally */
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center; /* Vertically center */
    padding: 2rem;
}

.container {
    width: 100%;
    max-width: 800px; /* Prevents the container from becoming too wide on desktops */
    background: rgba(30, 41, 59, 0.4); /* Glassmorphic panel */
    backdrop-filter: blur(16px); /* Blurs background behind the panel */
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2.5rem;
}
```

---

## Step 6: Review & Practice

To test and build this simplified structure:
1. Create `index.html`, `appPelis.js`, and `style.css` in a folder.
2. Paste the code from Steps 1, 3/4, and 5 into their respective files.
3. Open `index.html` in your browser.
4. Experiment with altering `grid-template-columns` (e.g. try `1fr 1fr 1fr` to make it a 3-column grid) to see how columns dynamically adapt to the available container space!
