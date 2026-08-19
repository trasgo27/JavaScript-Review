You're on the right track — you have the `async function` declared and the first `await` call to `getAuthToken`. Here's what's done well and what's still missing:

**Good:**
- Correct `async function iniciarSesion(username, password)` signature
- Correctly awaiting `getAuthToken`

**Missing (still to do):**
1. **Chain the calls** — use `miToken` to call `getUserProfile(miToken)`, then use the returned `id` to call `getUserPosts(id)`No worries at all! It is a tiny visual detail, which is why it is so easy to miss. 

Look very closely at the first few lines inside your `iniciarSesion` function:

```javascript
async function iniciarSesion(username, password) {
  const miToken = await getAuthToken(username, password); // <--- THIS LINE IS OUTSIDE!
  try {
    const miUsuario = await getUserProfile(miToken);
    // ...
```

Notice how `const miToken = await getAuthToken(...)` is **above** the `try {` line? It is completely outside the `try...catch` safety net.

**Why does this matter?**
If you pass the wrong password, `getAuthToken` will immediately throw an error. But because that line is *outside* the `try` block, the `catch (err)` block cannot see it or catch it. The error just slips right past it!

**The Fix:**
To fix it, you just need to move that single line **inside** the `try` block, like this:

```javascript
async function iniciarSesion(username, password) {
  try {
    // Now it is inside the safety net!
    const miToken = await getAuthToken(username, password); 
    
    const miUsuario = await getUserProfile(miToken);
    console.table(miUsuario);
    
    const miId = miUsuario.id;
    const misPosts = await getUserPosts(miId);
    console.table(misPosts);  
    
    const longi = misPosts.length;
    const miUltimo = misPosts[longi-1];
    console.log(`Mi último post ${miUltimo}`);  
    
  } catch (err) {
    console.error('El error es:', err.message);
  }
}
```

The rest of your code (the logic, the `await` chaining, the array extraction) is **absolutely perfect**! You just had to move one line down. 

Try making that small change and run it again with the wrong password. You should see your nice `El error es: Credenciales inválidas` message instead of a crash!No worries at all! It is a tiny visual detail, which is why it is so easy to miss. 

Look very closely at the first few lines inside your `iniciarSesion` function:

```javascript
async function iniciarSesion(username, password) {
  const miToken = await getAuthToken(username, password); // <--- THIS LINE IS OUTSIDE!
  try {
    const miUsuario = await getUserProfile(miToken);
    // ...
```

Notice how `const miToken = await getAuthToken(...)` is **above** the `try {` line? It is completely outside the `try...catch` safety net.

**Why does this matter?**
If you pass the wrong password, `getAuthToken` will immediately throw an error. But because that line is *outside* the `try` block, the `catch (err)` block cannot see it or catch it. The error just slips right past it!

**The Fix:**
To fix it, you just need to move that single line **inside** the `try` block, like this:

```javascript
async function iniciarSesion(username, password) {
  try {
    // Now it is inside the safety net!
    const miToken = await getAuthToken(username, password); 
    
    const miUsuario = await getUserProfile(miToken);
    console.table(miUsuario);
    
    const miId = miUsuario.id;
    const misPosts = await getUserPosts(miId);
    console.table(misPosts);  
    
    const longi = misPosts.length;
    const miUltimo = misPosts[longi-1];
    console.log(`Mi último post ${miUltimo}`);  
    
  } catch (err) {
    console.error('El error es:', err.message);
  }
}
```

The rest of your code (the logic, the `await` chaining, the array extraction) is **absolutely perfect**! You just had to move one line down. 

Try making that small change and run it again with the wrong password. You should see your nice `El error es: Credenciales inválidas` message instead of a crash!
2. **Print results** — `console.log()` the posts
3. **Error handling** — wrap all calls in a `try { ... } catch (error) { console.error(...) }` block
4. **Test calls** — call `iniciarSesion("admin", "1234")` and `iniciarSesion("admin", "wrong")`

Much better — you're almost there. The core chain is complete and both test calls are present.

**One real issue:**
- **Line 43** (`await getAuthToken(...)`) is **outside** the `try` block. If auth fails (e.g., `"wrong"` password), the rejection becomes an unhandled promise rejection — it won't be caught by your `catch` on line 53. Move it inside the `try`.

**Minor nit (not a bug):**
- Task says "print the final posts to the console" — you used `console.table` and also added extra logic for the last post. That works, but `console.log(misPosts)` would be more direct per the spec.

No worries at all! It is a tiny visual detail, which is why it is so easy to miss. 

Look very closely at the first few lines inside your `iniciarSesion` function:

```javascript
async function iniciarSesion(username, password) {
  const miToken = await getAuthToken(username, password); // <--- THIS LINE IS OUTSIDE!
  try {
    const miUsuario = await getUserProfile(miToken);
    // ...
```

Notice how `const miToken = await getAuthToken(...)` is **above** the `try {` line? It is completely outside the `try...catch` safety net.

**Why does this matter?**
If you pass the wrong password, `getAuthToken` will immediately throw an error. But because that line is *outside* the `try` block, the `catch (err)` block cannot see it or catch it. The error just slips right past it!

**The Fix:**
To fix it, you just need to move that single line **inside** the `try` block, like this:

```javascript
async function iniciarSesion(username, password) {
  try {
    // Now it is inside the safety net!
    const miToken = await getAuthToken(username, password); 
    
    const miUsuario = await getUserProfile(miToken);
    console.table(miUsuario);
    
    const miId = miUsuario.id;
    const misPosts = await getUserPosts(miId);
    console.table(misPosts);  
    
    const longi = misPosts.length;
    const miUltimo = misPosts[longi-1];
    console.log(`Mi último post ${miUltimo}`);  
    
  } catch (err) {
    console.error('El error es:', err.message);
  }
}
```

The rest of your code (the logic, the `await` chaining, the array extraction) is **absolutely perfect**! You just had to move one line down. 

Try making that small change and run it again with the wrong password. You should see your nice `El error es: Credenciales inválidas` message instead of a crash!
