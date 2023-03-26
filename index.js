document.addEventListener("DOMContentLoaded", () => {
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");
    const pokemonUl = document.querySelector("#pokemon");
    const typeFrom = document.querySelecto("#from");
    const typeTo = document.querySelector("#to");

    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputPokemon = formSearchPokemon.value;       
        searchPokemon(inputPokemon)
    })

    formSearchType.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputType = formSearchType.value;
        searchType(inputType)
    })
})

function searchPokemon (name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then( (res) => res.json() )
    .then( (data) => {

    })
}

function searchType (type) {
    fetch(`https://pokeapi.co/api/v2/type/${type}/`)
    .then( (res) => )
}