# JavaScript Promises Basics

## 1. What is a Promise?

A Promise is an object representing the **eventual completion** (or failure) of an asynchronous operation.

Three states:
| State | Meaning |
|-------|---------|
| `pending` | Initial state — neither fulfilled nor rejected |
| `fulfilled` | Operation completed successfully |
| `rejected` | Operation failed |

```js
const promise = new Promise((resolve, reject) => {
  // async work here
});
```

---

## 2. Creating a Promise

```js
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Usage
wait(1000).then(() => console.log('1 second passed'));
```

- `resolve(value)` — fulfills the promise with `value`
- `reject(error)` — rejects the promise with `error`

---

## 3. Consuming a Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve('Done!');
  else reject(new Error('Failed'));
});

promise
  .then((value) => console.log(value))   // 'Done!'
  .catch((error) => console.error(error)) // handles rejection
  .finally(() => console.log('Always runs'));
```

| Method | Runs when |
|--------|-----------|
| `.then(onFulfilled)` | Promise is fulfilled |
| `.catch(onRejected)` | Promise is rejected |
| `.finally(onFinally)` | Always (no matter the outcome) |

---

## 4. Chaining

Return a value from `.then()` to pass it to the next `.then()`:

```js
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err));
```

Each `.then()` returns a **new promise**, so errors propagate down to the nearest `.catch()`.

---

## 5. Static Methods

| Method | Resolves when… | Short Example |
|--------|---------------|---------------|
| `Promise.resolve(val)` | Immediately | `Promise.resolve(42)` |
| `Promise.reject(err)` | Immediately | `Promise.reject(new Error('no'))` |
| `Promise.all([...])` | **All** fulfill (or **any** rejects) | Parallel API calls |
| `Promise.allSettled([...])` | All settle (fulfill **or** reject) | Know when everything finished |
| `Promise.race([...])` | First settles (wins) | Timeout race |
| `Promise.any([...])` | First fulfills (wins) | Fastest successful result |

```js
// Promise.all — all must succeed
const [user, posts] = await Promise.all([
  fetch('/user/1'),
  fetch('/posts?userId=1'),
]);

// Promise.race — timeout pattern
const result = await Promise.race([
  fetch('/data'),
  new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
]);
```

---

## 6. Async / Await

Syntactic sugar over Promises — makes async code read like sync code.

```js
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed:', error);
  }
}
```

- `async` function **always returns a Promise**
- `await` **pauses** execution until the promise settles (only inside `async`)
- Use `try/catch` instead of `.catch()`

Equivalent without async/await:

```js
function getData() {
  return fetch('/api/data')
    .then((res) => res.json())
    .catch((err) => console.error('Failed:', err));
}
```

---

## 7. Common Pitfalls

| Pitfall | Wrong | Right |
|---------|-------|-------|
| Forgetting to return in `.then()` | `.then(user => { fetchPosts(user.id) })` | `.then(user => fetchPosts(user.id))` |
| Not catching errors | `.then(fn).then(fn2)` | `.then(fn).then(fn2).catch(handle)` |
| Promise inside `.then()` without return | `.then(user => { return fetchPosts(user.id).then(posts => ...) })` | Chain instead: `.then(user => fetchPosts(user.id)).then(posts => ...)` |
| Mixing sync errors in async | `async fn() { throw 'x' }` | Always `throw new Error('x')` |

---

## 8. Quick Reference Card

```js
// Create
new Promise((resolve, reject) => { /* ... */ })

// Consume
.then(value => { /* fulfilled */ })
.catch(error => { /* rejected */ })
.finally(() => { /* always */ })

// Static
Promise.resolve(value)
Promise.reject(error)
Promise.all(iterable)
Promise.allSettled(iterable)
Promise.race(iterable)
Promise.any(iterable)

// Async sugar
async function fn() { /* ... */ }
await promise
```
