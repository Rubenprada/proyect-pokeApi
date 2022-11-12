//import {fetchPokemon, fetchPokemons, previus$$, next$$, createPokemon, progressBars, pokeForm, pokeForm$$} from './general';

'use strict';

const pokemonContainer = document.getElementById('list-pokemons');
const input = document.getElementById('main__div2_searchPoke');
const form = document.getElementById('formulario');

const busca = (event) => {
    event.preventDefault();
    searchPokemon(input.value);
    form.addEventListener('click', () => {
        pokemonContainer.innerHTML = '';
    });
    pokemonContainer.addEventListener('click', () => {
        pokemonContainer.innerHTML = '';
    });
}

form.addEventListener('submit', busca);



