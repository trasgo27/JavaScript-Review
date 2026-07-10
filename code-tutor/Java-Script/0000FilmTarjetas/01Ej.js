const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi" },
    { id: 2, title: "The Conjuring", genre: "Horror" },
    { id: 3, title: "Pulp Fiction", genre: "Crime" },
    { id: 4, title: "It", genre: "Horror" }
];

const listado = document.getElementById('listado');

function conseguirDirector(movie){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(movie.genre !=="Horror"){
                resolve('Christopher Nolan');
            }else{
                reject('Director CONFIDENCIAL');
            }
        },800);
    });
}

function pintar(movie){
   //Clear list before rendering
   listado.innerHTML = "";
   movies.forEach((movie)=>{
    //Create card container
    const card = document.createElement('li');
    card.className = 'movie-card';//importante className vs classList
    //Store the whole movie object on the DOM
    card.movie = movie;
    //Create elements inside the card
    const titulo = document.createElement('h3');
    titulo.innerText = movie.title;

    const infoSpan = document.createElement('span');
    infoSpan.className = 'director';
    infoSpan.innerText = "Hover to reveal director";
    //Assemble cards
    card.appendChild(titulo);
    card.appendChild(infoSpan);

    //add interactive hover event
    //closure concept, movie, infoSpan
    card.addEventListener('mouseenter',()=>{
        infoSpan.textContent = "Fetching director ...";
        conseguirDirector(movie)
        .then((men)=>{
            infoSpan.textContent = `Dir: ${men}`;
        })
        .catch((err)=>{
            infoSpan.textContent =`${err}`;
            infoSpan.style.color = "red";
        });
    });
    //reset text when mouse leaves
    card.addEventListener('mouseleave',()=>{
        infoSpan.textContent = "Hover to reveal director";
        infoSpan.style.color = ""; //Reset color back to CSS default
    });
    listado.appendChild(card);
   });
}
//Call the function when the document is ready
document.addEventListener('DOMContentLoaded',pintar);