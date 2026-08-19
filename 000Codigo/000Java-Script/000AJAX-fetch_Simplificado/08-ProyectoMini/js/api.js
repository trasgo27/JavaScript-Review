// js/api.js — API functions
// 💡 Pista: Esta función debe hacer fetch a la API y retornar los usuarios

async function fetchUsers() {
    // 💡 Pista: Usa fetch con esta URL:
    // 'https://jsonplaceholder.typicode.com/users'
    // 💡 Pista: El patrón es:
    // const res = await fetch(URL);
    // if (!res.ok) throw new Error('Error');
    // const data = await res.json();
    // return data;

    /* Tu código aquí */


}

async function searchUsers(query) {
    // 💡 Pista: Primero obtén todos los usuarios con fetchUsers()
    // 💡 Pista: Luego filtra por nombre:
    // return users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

    /* Tu código aquí */


}

// No toques esto — el framework usa estas funciones
window.API = { fetchUsers, searchUsers };
