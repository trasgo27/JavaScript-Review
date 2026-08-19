// --- SIMULATED API (Do not modify these) ---

function getAuthToken(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "1234") {
                resolve("token_super_secreto_123");
            } else {
                reject(new Error("Credenciales inválidas"));
            }
        }, 1000);
    });
}

function getUserProfile(token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === "token_super_secreto_123") {
                resolve({ id: 1, name: "Qwen User", role: "Developer" });
            } else {
                reject(new Error("Token no autorizado"));
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve(["Post 1: Hello World", "Post 2: Learning Async/Await"]);
            } else {
                reject(new Error("Usuario no encontrado"));
            }
        }, 1000);
    });
}

// --- YOUR CODE GOES HERE ---

// 1. Write your async function iniciarSesion(username, password) below:
async function iniciarSesion(username, password) {  
  try {
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

// 2. Test it with correct credentials:
iniciarSesion("admin", "1234");

// 3. Test it with incorrect credentials:
iniciarSesion("admin", "wrong");