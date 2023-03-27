document.addEventListener("DOMContentLoaded", () => {
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");

    const inputPokemon = document.querySelector("#inputPokemon")
    const inputType = document.querySelector("#inputType1")
    const typeTo = document.querySelector("#to");

    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const pokemonName = inputPokemon.value;
        searchPokemon(pokemonName);
    })

    

    formSearchType.addEventListener("submit", (e) => {
        e.preventDefault();
        const typeName = inputType.value;
        searchType(typeName)
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
            img1.width = 250;
            img1.height = 250;
        let img2 = document.createElement("img")
            img2.width = 250;
            img2.height = 250;
        

        name.innerHTML = "NAME : " + data.name;
        id.innerHTML = "ID : " + data.id;
        type.innerHTML = "Types : " + data.types.map(type => type.type.name).join(', ');
        img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png";
        img2.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + data.id + ".png";

        div.appendChild(img1)
        div.appendChild(img2)

        ul.appendChild(name)
        ul.appendChild(id)
        ul.appendChild(type)

        div.appendChild(ul)
        fetch(data.species.url)
        .then((res) => res.json())
        .then((species) => {
            fetch(species.evolution_chain.url)
            .then((res) => res.json())
            .then((data) => {
                let evolLi = document.createElement("li")
                evolLi.innerHTML = "Evolution Chain : ";
                
                let evolutionChain = [data.chain.species.name];
                let nextEvolutions = data.chain.evolves_to;

                while (nextEvolutions.length > 0) {
                    evolutionChain.push(nextEvolutions[0].species.name);
                    nextEvolutions = nextEvolutions[0].evolves_to;
                }
                for ( let i = 0; i < evolutionChain.length; i++) {
                    let span = document.createElement("span");
                    span.textContent = evolutionChain[i];
                    evolLi.appendChild(span);
                    if(i !== evolutionChain.length-1) {
                        let arrow = document.createTextNode(" => ");
                        evolLi.appendChild(arrow);
                    }
                    span.addEventListener("click", () => {
                        searchPokemon(evolutionChain[i]);
                      });
                }
                ul.appendChild(evolLi)
                
            });
        });
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
    const typeFrom = document.querySelector("#from");
    typeFrom.innerHTML = " ";

    fetch(`https://pokeapi.co/api/v2/type/${inputType}/`)
    .then( (res) => res.json() )
    .then( (data) => {
        let arrDoubleDamageTo = [];
        let pathDoubleDamageTO = data.damage_relations.double_damage_to;
        
        let arrHalfDamageTo = [];
        let pathHalfDamageTo = data.damage_relations.half_damage_to;

        let arrNoDamageTo = [];
        let pathNoDamageTo = data.damage_relations.no_damage_to;

        let arrDoubleDamageFrom = [];
        let pathDoubleDamageFrom = data.damage_relations.double_damage_from;

        let arrHalfDamageFrom = [];
        let pathHalfDamageFrom = data.damage_relations.half_damage_from;

        let arrNoDamageFrom = [];
        let pathNoDamageFrom = data.damage_relations.no_damage_from;

        for (let i = 0; i < pathDoubleDamageTO.length; i++) {
            arrDoubleDamageTo.push(pathDoubleDamageTO[i].name)
        }

        for (let i = 0; i < pathHalfDamageTo.length; i++) {
            arrHalfDamageTo.push(pathHalfDamageTo[i].name)
        }

        for (let i = 0; i < pathNoDamageTo.length; i++) {
            arrNoDamageTo.push(pathNoDamageTo[i].name)
        }

        for (let i = 0; i < pathDoubleDamageFrom.length; i++) {
            arrDoubleDamageFrom.push(pathDoubleDamageFrom[i].name)
        }
        
        for (let i = 0; i < pathHalfDamageFrom.length; i++) {
            arrHalfDamageFrom.push(pathHalfDamageFrom[i].name)
        }

        for (let i = 0; i < pathNoDamageFrom.lenth; i++) {
            arrNoDamageFrom.push(pathNoDamageFrom[i].name)
        }

        let doubleDamageTo =document.createElement("li");
            doubleDamageTo.innerHTML = "Double Damage To : " + arrDoubleDamageTo.join(", ");
        
        let halfDamageTo = document.createElement("li");
            halfDamageTo.innerHTML = "Half Damamge To : " + arrHalfDamageTo.join(", ");

        let noDamageTo = document.createElement("li");
            noDamageTo.innerHTML = "No Damage To : " + arrNoDamageTo.join(", ");

        let doubleDamageFrom = document.createElement("li");
            doubleDamageFrom.innerHTML = "Double Damage From : " + arrDoubleDamageFrom.join(", ");
        
        let halfDamageFrom = document.createElement("li");
            halfDamageFrom.innerHTML = "Half Damage From : " + arrHalfDamageFrom.join(", ");

        let noDamageFrom = document.createElement("li");
            noDamageFrom.innerHTML = "No Damage From : " + arrNoDamageFrom.join(", ");
        
        typeFrom.appendChild(doubleDamageTo)
        typeFrom.appendChild(halfDamageTo)
        typeFrom.appendChild(noDamageTo)

        typeFrom.appendChild(doubleDamageFrom)
        typeFrom.appendChild(halfDamageFrom)
        typeFrom.appendChild(noDamageFrom)
    })
}

