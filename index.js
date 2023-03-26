document.addEventListener("DOMContentLoaded", () => {
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");

    const inputPokemon = document.querySelector("#inputPokemon")
    const typeFrom = document.querySelector("#from");
    const typeTo = document.querySelector("#to");

    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const pokemonName = inputPokemon.value;
        searchPokemon(pokemonName);
    })

    

    formSearchType.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputType = inputType.value;
        searchType(inputType)
    })
})

function searchPokemon (pokemonName) {
    let div = document.querySelector("#pokemon-name-result")
    div.innerHTML = " ";

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then( (res) => res.json() )
    .then( (data) => {
        let ul = document.createElement("ul")
        let name = document.createElement("li")
        let id = document.createElement("li")
        let type = document.createElement("li")
        let img1 = document.createElement("img")
        img1.width = 200;
        img1.height = 200;
        let img2 = document.createElement("img")
        img2.width = 200;
        img2.height = 200;
        

        name.innerHTML = "NAME : " + data.name;
        id.innerHTML = "ID : " + data.id;
        type.innerHTML = "Types : " + data.types.map(type => type.type.name);
        img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png";
        img2.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + data.id + ".png";

        div.appendChild(img1)
        div.appendChild(img2)

        ul.appendChild(name)
        ul.appendChild(id)
        ul.appendChild(type)

        div.appendChild(ul)
    })
    .catch( (err) => {
        console.log(err)
        let p = document.createElement("p");
        p.innerHTML = "Sorry, I think this is not Pokemon. I can not find it.";
        let div = document.querySelector("#result");
        div.appendChild(p)
    })
}

function searchType (inputType) {
    fetch(`https://pokeapi.co/api/v2/type/${inputType}/`)
    .then( (res) => res.json() )
    .then( (data) => {

    })
}