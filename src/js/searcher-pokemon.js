'use strict';
import {createPokemon, progressBars} from './print-pokemon.js';
import {removeChildNodes} from './remove-childs.js';
import {fetchPokemons} from './call-to-api.js';

const pokemonContainer = document.querySelector(".pokemon-container");
//Creo una variable para poder coger el formulario
let pokeForm = document.getElementById('searchPokemon');
//creo una función para extraer pokemon de la api para el buscador
function searchPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}
//creo un evento con ese formulario
const searcherForm = pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    //creo una variable para coger el valor del input
    let searchPokemons = document.getElementById('pokemon').value.toLowerCase();
    //le digo que si es true me lo muestre
    
    //que si el valor es true me quite el contenedor de los pokemon y me muestre el que busco
    //y le paso la funcion de remove para eliminar a el hijo de pokemonContainer 
    if (searchPokemons) {
      removeChildNodes(pokemonContainer);
      searchPokemon(searchPokemons)
    //si no meto valor me salte una alerta
    } else {
      alert('you have to put a value');
    };
  
    const main = document.querySelector('.main');
    const div$$ = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('name', 'remove')
    button.textContent = 'Return';
    div$$.appendChild(button);
    const nav = document.getElementById('.pagination');
    main.appendChild(div$$);
    button.addEventListener('click', e =>{
      removeChildNodes(pokemonContainer);
      removeChildNodes(div$$);
      fetchPokemons();
    })
});

export {searcherForm}