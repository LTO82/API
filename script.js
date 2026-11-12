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
// Grab the page elements we need
const card = document.getElementById("card");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const randomBtn = document.getElementById("random-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentId = 25; // start on Pikachu

function showMessage(text) {
  card.innerHTML = `<div class="message">${text}</div>`;
}

// Fetch one Pokémon from the API. Throws a helpful error if something goes wrong.
async function getPokemon(query) {
  let response;
  try {
    response = await fetch(API_URL + encodeURIComponent(String(query).toLowerCase().trim()));
  } catch (err) {
    throw new Error("network");
  }
  if (response.status === 404) throw new Error("notfound");
  if (!response.ok) throw new Error("server");
  return response.json();
}

// Turn the API data into HTML and put it on the page
function renderPokemon(p) {
  const types = p.types.map((t) => t.type.name);
  const art = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
  const mainColor = TYPE_COLORS[types[0]] || "#eeeeee";
  const barColor = BAR_COLORS[types[0]] || "#ff9fcf";

  const typeBadges = types
    .map((t) => `<span class="type" style="background:${TYPE_COLORS[t] || "#eee"}">${t}</span>`)
    .join("");

  const statRows = p.stats
    .map((s) => {
      const width = Math.min((s.base_stat / 180) * 100, 100);
      const name = s.stat.name.replace("special-", "sp. ");
      return `<div class="stat"><span>${name}</span><b>${s.base_stat}</b>
        <div class="bar"><i style="width:${width}%; background:${barColor}"></i></div></div>`;
    })
    .join("");

  card.innerHTML = `
    <div class="top" style="background:${mainColor}">
      <div class="num">#${String(p.id).padStart(4, "0")}</div>
      <img src="${art}" alt="${p.name}">
      <h2>${p.name.replace("-", " ")}</h2>
      ${typeBadges}
    </div>
    <div class="body">
      <div class="facts">
        <div><b>${(p.height / 10).toFixed(1)} m</b>Height</div>
        <div><b>${(p.weight / 10).toFixed(1)} kg</b>Weight</div>
        <div><b>${p.abilities[0].ability.name.replace("-", " ")}</b>Ability</div>
      </div>
      ${statRows}
    </div>`;
}

async function showPokemon(query) {
  showMessage("Looking for your Pokémon… ✨");
  try {
    const pokemon = await getPokemon(query);
    currentId = pokemon.id;
    renderPokemon(pokemon);
  } catch (err) {
    if (err.message === "notfound") {
      showMessage('Oh no, no Pokémon found! (つ﹏<) Try a name like "bulbasaur" or a number from 1 to ' + MAX_POKEMON + ".");
    } else if (err.message === "network") {
      showMessage("Can't reach PokéAPI (T_T). Check your internet connection, and open this page in a regular browser tab (Chrome, Safari, Firefox).");
    } else {
      showMessage("PokéAPI had a problem. Wait a moment and try again.");
    }
  }
}

// Event listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim()) showPokemon(input.value);
});

randomBtn.addEventListener("click", () => {
  showPokemon(Math.floor(Math.random() * MAX_POKEMON) + 1);
});

prevBtn.addEventListener("click", () => showPokemon(Math.max(1, currentId - 1)));
nextBtn.addEventListener("click", () => showPokemon(Math.min(MAX_POKEMON, currentId + 1)));

// Load the first Pokémon when the page opens
showPokemon(currentId);
