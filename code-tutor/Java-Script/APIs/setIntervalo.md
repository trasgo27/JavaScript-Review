# setInterval flip-flop: countdown ↔ button

## The problem

A one-shot countdown that stops at 0 and shows a notification doesn't let the user try again. The notification appears once and if missed, it's gone.

## The solution: state-based flip-flop

One single `setInterval` alternates between two phases using a boolean flag:

```
esperandoClick = false  →  countdown phase: show 5, 4, 3, 2, 1, 0
                        →  switch → show button + notification
esperandoClick = true   →  button phase: wait 5 seconds with button visible
                        →  switch → hide button
esperandoClick = false  →  countdown phase: show 5, 4, 3, 2, 1, 0
                        →  ...loops forever until user clicks
```

## State variables

| Variable | Purpose |
|---|---|
| `let time = 5` | Reused for both phases — counts down from 5 in countdown phase, also counts down from 5 as a timer in button phase |
| `let esperandoClick = false` | Toggles between countdown (`false`) and button (`true`) phases |

## The interval logic

```js
const idInter = setInterval(() => {
    if (esperandoClick) {
        // button phase: wait 5s, then reset
        time--;
        if (time <= 0) {
            time = 5;
            esperandoClick = false;
            miBoton.classList.add('invisible');
            limpiarTime();
        }
    } else {
        // countdown phase
        console.log(time);
        mostrarTime();
        time--;
        if (time < 0) {
            time = 5;          // also used for button phase duration
            esperandoClick = true;
            limpiarTime();
            miBoton.classList.remove('invisible');
            notificar();
        }
    }
}, 1000);
```

## Key behaviors

- **Countdown shows**: 5, 4, 3, 2, 1, 0
- **Button phase lasts**: 5 seconds (using `time` as a countdown timer)
- **Notification fires once per cycle** when entering button phase
- **Interval stops only on click** — `clearInterval(idInter)` inside the button click handler
- **No recursive setTimeout** — a single flat `setInterval` drives everything
- **Button listener set up once** at script start — avoids duplicate listeners

## Click handler

```js
miBoton.addEventListener('click', () => {
    clearInterval(idInter);
    window.open('video.html', '_blank');
});
```

Stops the interval and navigates to the video page.
