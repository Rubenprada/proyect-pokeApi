"use strict";
import { removeChildNodes } from "./remove-childs.js";
import { fetchPokemons } from "./call-to-api.js";

const pagination = () => {
  const pokemonContainer = document.querySelector(".pokemon-container");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  let limit = 8;
  let offset = 1;
  debugger
  //creo una funcion con eventListener para que cuando el offset sea distinto de uno, si le doy al boton de previous, me traiga los
  //nueve anteriores
  previous.addEventListener("click", () => {
    debugger
    if (offset != 1) {
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
  });
  //creo una funcion para que cuando le de al boton de next me traiga los nueve siguientes
  next.addEventListener("click", () => {
    debugger
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  });
};
export { pagination}