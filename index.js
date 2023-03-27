document.addEventListener("DOMContentLoaded", () => {
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");

    const inputPokemon = document.querySelector("#inputPokemon")
    const inputType = document.querySelector("#inputType1")

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
    let p = document.createElement("p");
        p.innerHTML = " ";
        div.appendChild(p)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then( (res) => res.json() )
    .then( (data) => {
        let img1 = document.createElement("img")
        img1.width = 250;
        img1.height = 250;
        let img2 = document.createElement("img")
        img2.width = 250;
        img2.height = 250;
       
        img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png";
        img2.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + data.id + ".png";

        //information of Pokemon on table
        let table = document.createElement("table")
        let trForName = document.createElement("tr")
        let trForId = document.createElement("tr")
        let trForType = document.createElement("tr")
        let trForAbility = document.createElement("tr")
   
        table.appendChild(trForName)
        table.appendChild(trForId)
        table.appendChild(trForType)
        table.appendChild(trForAbility)

        let name = document.createElement("th")
        let id = document.createElement("td")
        let type = document.createElement("td")
        let ability = document.createElement("td")

        name.innerHTML = "NAME"
        id.innerHTML = "ID"
        type.innerHTML = "TYPE"
        ability.innerHTML = "ABILITY"

        let tdName = document.createElement("th")
        let tdId = document.createElement("td")
        let tdType = document.createElement("td")
        let tdAbility = document.createElement("td")
        
        tdName.innerHTML = data.name.toUpperCase();
        tdId.innerHTML = data.id;
        tdType.innerHTML = data.types.map(type => type.type.name).join(', ');
        tdAbility.innerHTML = data.abilities.map(ability => ability.ability.name).join(", ")
        
        trForName.appendChild(name)
        trForName.appendChild(tdName)

        trForId.appendChild(id)
        trForId.appendChild(tdId)

        trForType.appendChild(type)
        trForType.appendChild(tdType)

        trForAbility.appendChild(ability)
        trForAbility.appendChild(tdAbility)

        div.appendChild(img1)
        div.appendChild(img2)

        div.appendChild(table) 

        fetch(data.species.url)
        .then((res) => res.json())
        .then((species) => {
            fetch(species.evolution_chain.url)
            .then((res) => res.json())
            .then((data) => {
                let trForEvolution = document.createElement("tr")
                let evol = document.createElement("td")
                evol.innerHTML = "EVOLUTION CHAIN"
                let evolLi = document.createElement("td")
                
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
                trForEvolution.appendChild(evol)
                trForEvolution.appendChild(evolLi)
                table.appendChild(trForEvolution)
            });
        });
    })
    .catch( (err) => {
        console.log(err)
        p.innerHTML = "Sorry, I think this is not Pokemon. I can not find it.";
    })
}

function searchType (inputType) {
    const typeTo = document.querySelector("#to");
    const typeFrom = document.querySelector("#from");
    typeTo.innerHTML = " ";
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
        
        typeTo.appendChild(doubleDamageTo)
        typeTo.appendChild(halfDamageTo)
        typeTo.appendChild(noDamageTo)

        typeFrom.appendChild(doubleDamageFrom)
        typeFrom.appendChild(halfDamageFrom)
        typeFrom.appendChild(noDamageFrom)
    })
}

