'use strict';
import { createPokemon, progressBars} from './print-pokemon.js'




const fetchPokemons = async(offset = 1, limit = 8) => {
  const pokemonRequests = [];
  for (let i = offset; i <= offset + limit; i++) {
      const promisePokemon = fetch('https://pokeapi.co/api/v2/pokemon/' + i).then(res => res.json());
      pokemonRequests.push(promisePokemon);  
  }
  Promise.all(pokemonRequests).then(results => {
      results.forEach((pokemon, index) => {
          createPokemon(pokemon, index + 1);
      });
  })
};

export {fetchPokemons}