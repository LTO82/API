const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_POKEMON = 1025;

const TYPE_COLORS = {
  normal: "#e2dfd0", fire: "#ffc9a8", water: "#b3d4ff", electric: "#fff09e",
  grass: "#c4f0b4", ice: "#c8f2f0", fighting: "#ffb8b0", poison: "#e6bff0",
  ground: "#f0dcae", flying: "#d4ccff", psychic: "#ffc2d9", bug: "#dff0a0",
  rock: "#e6dca8", ghost: "#d2c0ec", dragon: "#c9b8ff", dark: "#d4c4bc",
  steel: "#d8dbe8", fairy: "#ffd0e8",
};

// A slightly stronger version of each color for the stat bars
const BAR_COLORS = {
  normal: "#b9b49a", fire: "#ff9a62", water: "#6aa7ff", electric: "#ffd93d",
  grass: "#7ed56a", ice: "#6fd6d0", fighting: "#ff7f73", poison: "#c97bdc",
  ground: "#d9b86a", flying: "#9b8cff", psychic: "#ff85b3", bug: "#b5d44a",
  rock: "#cdbb64", ghost: "#a688d6", dragon: "#8c6cff", dark: "#a8907f",
  steel: "#a9aec8", fairy: "#ff9fcf",
};
