document.addEventListener("DOMContentLoaded", () => {
  const formSearchPokemon = document.querySelector("#search-pokemon");
  const formSearchType = document.querySelector("#type-calculater");

  const inputPokemon = document.querySelector("#inputPokemon")
  const inputType = document.querySelector("#inputType1")

  const toggleModeBtn = document.getElementById('toggle-mode');
  const bodyEl = document.getElementById('body');
  const imgEl = document.getElementById('img');

  formSearchPokemon.addEventListener("submit", (e) => {
      e.preventDefault();
      const pokemonName = inputPokemon.value.toLowerCase();
      searchPokemon(pokemonName);
  })

  formSearchType.addEventListener("submit", (e) => {
      e.preventDefault();
      const typeName = inputType.value;
      searchType(typeName)
      inputType.value =""
  })

  //toggle day to night, night to day
  toggleModeBtn.addEventListener('click', function() {
      if (bodyEl.classList.contains('day-mode')) {
        bodyEl.classList.remove('day-mode');
        bodyEl.classList.add('night-mode');
        toggleModeBtn.textContent = 'Day mode';
      } else {
        bodyEl.classList.remove('night-mode');
        bodyEl.classList.add('day-mode');
        toggleModeBtn.textContent = 'Night mode';
      }
    });
})

function searchPokemon (pokemonName) {
  let div = document.querySelector("#pokemon-name-result")
      div.innerHTML = " ";
  let divType = document.querySelector("#pokemon-type-result")
      divType.innerHTML = ""
  const toggleModeBtn = document.getElementById('toggle-mode');

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

      //stats of Pokemon table
      let stats = data.stats;
      let statsTable = document.createElement("table")
      let tHead = document.createElement("thead")
      let thRow = document.createElement("tr")
      let thStatName = document.createElement("th")
      let thStatValue = document.createElement("th")

      thStatName.innerHTML = "STAT"        
      thStatValue.innerHTML = "VALUE"

      thRow.appendChild(thStatName)
      thRow.appendChild(thStatValue)
      tHead.appendChild(thRow)
      statsTable.appendChild(tHead)

      let tableBody = document.createElement("tbody");
      stats.forEach(stat => {
          let row = document.createElement("tr");
          let statName = document.createElement("td")
          let statValue = document.createElement("td");

          statName.innerHTML = stat.stat.name;
          statValue.innerHTML = stat.base_stat;

          row.appendChild(statName);
          row.appendChild(statValue);
          tableBody.appendChild(row)
      })

      statsTable.appendChild(tableBody)
      div.appendChild(statsTable)

      //evolution chains
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
                  span.setAttribute("class","hover")
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

      let allTable = document.querySelectorAll("table")
          for(let i=0; i<allTable.length; i++) {
              allTable[i].style.margin = "0 auto";
              allTable[i].style.tableLayout = "fixed";
              allTable[i].style.width = "50%";
          }

      //comment about pokemon
      let commentForm = document.createElement("form")
      commentForm.setAttribute("id", "comment-form")
      let comment = document.createElement("input")
      comment.setAttribute("type","text")
      comment.style.height = "50px"
      comment.style.width = "300px"
      comment.setAttribute("placeholder",`leave your comment about ${data.name}!`)
      
      let submitBtn = document.createElement("input")
      submitBtn.setAttribute("type","submit")
      
      commentForm.appendChild(comment)
      commentForm.appendChild(submitBtn)
      
      comment.required = true;

      div.appendChild(commentForm)

      commentForm.addEventListener("submit", (e) => {
          let divComment = document.querySelector("#comment")
          e.preventDefault();
          let txtComment = comment.value;

          let commentData = {
              name : data.name,
              id_number : data.id,
              commented : txtComment
          }
      
          fetch("http://localhost:3000/comment", {
              method : "POST",
              headers: {
                  "Accept" : "application/json",
                  "Content-Type" : "application/json"
              },
              body : JSON.stringify(commentData)
          })
          .then( (res) => res.json() )
          .then( () => {
            const prevPar = document.querySelector("#comment p");
            if (prevPar) {
              divComment.removeChild(prevPar);
            }

              let par = document.createElement("p")
              par.innerHTML = ""
              par.innerHTML = 'Comment is updated successfully!';
              divComment.appendChild(par,commentForm)

          })
          comment.value = ""
      })
  })
  .catch( (err) => {
      let p = document.createElement("p");
      p.innerHTML = " ";
      div.appendChild(p)

      console.log(err)
      p.innerHTML = "Sorry, I think this is not Pokemon. I can not find it.";
  })
}

function searchType(inputType) {
  let divPoke = document.querySelector("#pokemon-name-result")
      divPoke.innerHTML = " ";
  const div = document.querySelector("#pokemon-type-result")
  div.innerHTML = "";

  const nameOfType = document.createElement("h3")
  nameOfType.innerHTML = `About ${inputType.charAt(0).toUpperCase() + inputType.slice(1)} Type`
  div.appendChild(nameOfType)

  const typeTable = document.createElement('table');
  const damageRelationHeaders = ['Double Damage To', 'Half Damage To', 'No Damage To', 'Double Damage From', 'Half Damage From', 'No Damage From'];
  const damageRelationKeys = ['double_damage_to', 'half_damage_to', 'no_damage_to', 'double_damage_from', 'half_damage_from', 'no_damage_from'];
  
  const typeTh = document.createElement('thead');
  const typeTo = document.createElement('tbody');
  const typeFrom = document.createElement('tbody');

  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  th1.innerHTML = "Damage Relations";
  th2.innerHTML = "Types";
  typeTh.appendChild(th1)
  typeTh.appendChild(th2)
  
  fetch(`https://pokeapi.co/api/v2/type/${inputType}/`)
    .then((res) => res.json())
    .then((data) => {
      const { double_damage_to, half_damage_to, no_damage_to, double_damage_from, half_damage_from, no_damage_from } = data.damage_relations;

      for (let i = 0; i < damageRelationHeaders.length; i++) {
        const header = document.createElement('th');
        header.textContent = damageRelationHeaders[i];

        const damageRelation = document.createElement('td');
        damageRelation.textContent = dataToText(eval(damageRelationKeys[i]));

        const row = document.createElement('tr');
        row.appendChild(header);
        row.appendChild(damageRelation);

        if (i < 3) {
          typeTo.appendChild(row);
        } else {
          typeFrom.appendChild(row);
        }
      }
      typeTable.appendChild(typeTh);
      typeTable.appendChild(typeTo);
      typeTable.appendChild(typeFrom);

      typeTable.style.margin = "0 auto";
      typeTable.style.tableLayout = "fixed";
      typeTable.style.width = "50%";

      div.appendChild(typeTable);
    })
    .catch( (err) => {
      let p = document.createElement("p");
      p.innerHTML = " ";
      div.appendChild(p)

      console.log(err)
      p.innerHTML = "Sorry, I think this is not Name of Type. I can not find it.";
  })
}

function dataToText(damageRelationData) {
  if (damageRelationData.length === 0) {
    return 'None';
  }

  const types = damageRelationData.map(type => type.name).join(', ');

  return types;
}
