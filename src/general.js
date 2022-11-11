'use strict';

const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 8;
let offset = 1;


//funcion para exportar los datos de la api
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => createPokemon(data))
};
//Creo funcion para coger los pokemon, estableciendo un offset(la cantidad que me pinte) y un limit(por cual empieza)
function fetchPokemons(offset, limit) {
  
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
};

//creo una funcion con eventListener para que cuando el offset sea distinto de uno, si le doy al boton de previous, me traiga los
//nueve anteriores
previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});
//creo una funcion para que cuando le de al boton de next me traiga los nueve siguientes
next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

//creo una función para pintar los pokemons
function createPokemon(pokemon) {

  //ESTRUCTURA DE LOS DIVS
  //      1-                POKEMON CONTAINER
  //                               |
  //      2-                   FLIP-CARD
  //                               |
  //      3-                 CARD-CONTAINER
  //                  |                         |
  //      4-         CARD                   CARD-BACK
  //                   |                        |
  //      5-  SPRITE  ID  NAME                 STATS


  //Creo un div que va a ser flipcard a la cual luego le voy a aplicar css para que se de la vuelta
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");
  //Creo un div que va a ser el cardContainer
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  //lo appendeo a flipCard
  flipCard.appendChild(cardContainer);
  //creo un div que va a ser la cara de los sprite, id y name
  const card = document.createElement("div");
  card.classList.add("pokemon-block");
  //creo div para poner el sprite
  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");
  //creo la img y su valor va a ser el de los pokemon sprites
  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);
  //creo variable para el id
  const number = document.createElement("p");
  number.textContent = pokemon.id;
  //creo variavle para el name
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  //creo una variable que sera un div para la cara de las stats
  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");
  //apendeo a ese div cardBack la funcion progressBarr pasando de argumento las estadisticas de los pokemon
  cardBack.appendChild(progressBars(pokemon.stats));
  //appendeo al div de la carta la cara de la imagen y la de las stats
  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  //y apendeo el flipcard a el pokemoncontainer
  pokemonContainer.appendChild(flipCard);
};



function progressBars(stats) {
  //creo una variable que va a ser un div contenedor de las stats
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");
  //Creo un bucle para iterar por los seis valores de las estadisticas
  for (let i = 0; i < 6; i++) {
    //guardo todas las estadisticas en stats
    const stat = stats[i];
    //tengo que dividir las estadisticas base para que me entren en las barras y poner el % para que rellenen la barra --> bootstrap
    const statPercent = stat.base_stat / 1.5 + "%";
    //creo un nuevo div contenedor para meter los nombres de las stats y sus barras
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");
    //creo una variable que es un  parrafo con el nombre de las stats
    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    //creo un div contenedor que será la barra
    const progress = document.createElement("div");
    progress.classList.add("progress");
    //creo un div que será el progreso de la barra
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    //establezco que el valor de la barra sera las stats
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    //el minimo 0
    progressBar.setAttribute("aria-valuemin", 0);
    //y el máximo 300
    progressBar.setAttribute("aria-valuemax", 300);
    //y ese ancho de barra, el color azul sera las stats /2 para qeu entren
    progressBar.style.width = statPercent;
    //aqui pongo el numero de la stat
    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
};
//creo una funcion que elimine los divs a la cual le voy a pasar un div padre
function removeChildNodes(parent) {
  //mientras ese div padre exista, elimine su hijo
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

fetchPokemons(offset, limit);


//Creo una variable para poder coger el formulario
let pokeForm = document.getElementById('searchPokemon');

//creo un evento con ese formulario
pokeForm.addEventListener('submit', e => {
  e.preventDefault();
  //creo una variable para coger el valor del input
  let searchPokemon = document.getElementById('pokemon').value.toLowerCase();
  //le digo que si es true me lo muestre
  fetchPokemon(searchPokemon, true);
  //que si el valor es true me quite el contenedor de los pokemon y me muestre el que busco
  //y le paso la funcion de remove para eliminar a el hijo de pokemonContainer 
  if (searchPokemon) {
    removeChildNodes(pokemonContainer);
    fetchPokemon()
  //si no meto valor me salte una alerta
  } else {
    alert('you have to put a value');
    fetchPokemon()
  };

  const main = document.querySelector('.main')
  const button = document.createElement('button');
  button.setAttribute('name', 'remove')
  button.textContent = 'Return';
  main.appendChild(button);
  const nav = document.getElementById('.pagination')
  button.addEventListener('click', e =>{
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  })
});

//export {fetchPokemon, fetchPokemons, previus, next, createPokemon, progressBars, pokeForm, pokeForm}
