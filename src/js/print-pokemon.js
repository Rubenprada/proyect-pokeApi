'use strict';


const pokemonContainer = document.querySelector(".pokemon-container");

//creo una función para pintar los pokemons
function createPokemon(pokemon, index) {

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

export {createPokemon, progressBars}