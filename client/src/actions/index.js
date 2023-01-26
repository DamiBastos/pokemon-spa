import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_TYPES = "FILTER_TYPES";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const MY_TEAM = "MY_TEAM";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios("/pokemons", {});
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios("/types", {});
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function getPokemonName(name) {
  return async function (dispatch) {
    var json = await axios("/pokemons?name=" + name);
    return dispatch({
      type: GET_NAME_POKEMON,
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios("/pokemons/" + id);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
}

export function filterTypes(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function myTeam(payload) {
  return {
    type: MY_TEAM,
    payload,
  };
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
  };
}
