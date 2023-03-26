document.addEventListener("DOMContentLoaded", () => {
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");  
    const typeFrom = document.querySelector("#from");
    const typeTo = document.querySelector("#to");

    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const pokemonName = formSearchPokemon.value;       
        searchPokemon(pokemonName);
    })

    formSearchType.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputType = formSearchType.value;
        searchType(inputType)
    })
})

function searchPokemon (pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then( (res) => res.json() )
    .then( (data) => {
        let name = document.createElement("li")
        let id = document.createElement("li")
        let type = document.createElement("li")
        let img1 = document.createElement("img")
        img1.width = 200;
        img1.height = 200;
        let img2 = document.createElement("img")
        img2.width = 200;
        img2.height = 200;
        let div = document.querySelector("#pokemon-name-result")

        name.innerHTML = "Name : " + data.name;
        id.innerHTML = "ID : " + data.id;
        type.innerHTML = "Types : " + data.types.map(type => type.type.name);
        img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png";
        img2.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + data.id + ".png";

        const pokemonUl = document.querySelector("#pokemon");

        div.insertBefore(img1, pokemonUl)
        div.insertBefore(img2, pokemonUl)
        pokemonUl.appendChild(name)
        pokemonUl.appendChild(id)
        pokemonUl.appendChild(type)
        
    })
}

function searchType (inputType) {
    fetch(`https://pokeapi.co/api/v2/type/${inputType}/`)
    .then( (res) => res.json() )
    .then( (data) => {

    })
}