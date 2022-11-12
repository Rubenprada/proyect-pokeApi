'use strict';
import { removeChildNodes } from "./js/remove-childs.js";
import { createPokemon, progressBars } from "./js/print-pokemon.js";
import { searcherForm } from "./js/searcher-pokemon.js";
import { fetchPokemons } from "./js/call-to-api.js";
import { pagination} from "./js/pagination.js";




pagination();
fetchPokemons();
