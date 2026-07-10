# Movie Database App Improvement Plan

We will debug, refactor, and redesign the Movie Database application to provide a premium, modern user interface with smooth interactions and robust code structure.

## User Review Required

> [!IMPORTANT]
> The current application has minimal styling and has minor CSS/JS issues. We will replace the inline style tag with a dedicated, beautiful CSS system using Google Fonts, a dark/semi-dark modern palette, glassmorphism card layouts, and micro-animations for interactive elements.
>
> We will preserve the core requirement: **storing the movie object directly on the DOM element (`li.movie = movie;`)**.

## Proposed Changes

### Configuration and Assets

#### [NEW] [style.css](file:///d:/00_JavaScript_Review/MovieDataBaseApp/style.css)
A new, modern stylesheet defining:
- Custom properties for design tokens (colors, fonts, shadow effects, transitions).
- Layout utilizing CSS Grid/Flexbox with cards instead of raw text bullets.
- Premium styling featuring card hover transitions, glowing elements, and dark mode aesthetics.
- Loading indicator styling for async director retrieval.

---

### Core Structure

#### [MODIFY] [index.html](file:///d:/00_JavaScript_Review/MovieDataBaseApp/index.html)
- Link the Google Fonts ("Outfit" and "Inter").
- Link the new external stylesheet `style.css`.
- Update layout elements: structure the main page container, add a subtitle, clean up obsolete style tags, and ensure proper metadata representation.
- Correct the CSS selector issue (change invalid `:mouseover` to `:hover`).

#### [MODIFY] [appPelis.js](file:///d:/00_JavaScript_Review/MovieDataBaseApp/appPelis.js)
- Refactor DOM-building code to match a card-based layout structure.
- Improve `fetchDirector()` output and add loading states (e.g. text/spinner transitions) to indicate loading process during the 800ms delay.
- Correct event listener bindings to support elegant CSS classes and handle error display nicely.
- Secure the logic to ensure that once a director is loaded or loading, duplicate trigger requests are prevented.

---

## Verification Plan

### Manual Verification
- Open `index.html` in a web browser.
- Verify page styling matches professional dark mode card layouts.
- Verify hovering a card displays a sleek loading state and then retrieves the director.
- Verify hovering horror films shows a custom, red-styled confidential error state.
- Check layout responsiveness on mobile/desktop screens.
