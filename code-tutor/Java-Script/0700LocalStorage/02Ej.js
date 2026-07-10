const miBotonS = document.getElementById('botonS');
const miBotonP = document.getElementById('botonP');
const miBotonB = document.getElementById('botonB');
const output = document.getElementById('output');

const userProfiles = [
  { username: 'trasgo', score: 42 },
  { username: 'luna', score: 88 },
];

// Reusable function to display profiles in the DOM
function displayProfiles(profiles) {
  if (!Array.isArray(profiles)) return;
  output.innerHTML = profiles
    .map(p => `Usuario: ${p.username}, puntos: ${p.score}`)
    .join('<br>');
}

// Reusable function to load and parse profiles from localStorage
function getSavedProfiles() {
  const jsonString = window.localStorage.getItem('user');
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return null;
  }
}

// Load automatically on startup if saved data exists
const savedProfiles = getSavedProfiles();
if (savedProfiles) {
  displayProfiles(savedProfiles);
}

// Save profiles to localStorage
miBotonS.addEventListener('click', () => {
  const jsonString = JSON.stringify(userProfiles);
  window.localStorage.setItem('user', jsonString);
  console.log('Datos guardados en localStorage.');
});

// Load and display profiles from localStorage manually
miBotonP.addEventListener('click', () => {
  const savedProfiles = getSavedProfiles();
  if (savedProfiles) {
    displayProfiles(savedProfiles);
  } else {
    console.log('localStorage está vacío o contiene datos inválidos.');
  }
});

//borrar
miBotonB.addEventListener('click',(e)=>{
  const savedProfiles = getSavedProfiles();
  if(savedProfiles){
    window.localStorage.removeItem('user');
    output.innerHTML = "BORRADO";
  }else{
    output.innerHTML = "Estaba vacio ...";
  }
});