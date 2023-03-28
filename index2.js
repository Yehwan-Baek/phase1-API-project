document.addEventListener("DOMContentLoaded", () => {
    const inputPokemon = document.querySelector("#inputPokemon")
    const formSearchPokemon = document.querySelector("#search-pokemon");

    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const pokemonName = inputPokemon.value.toLowerCase();
        loadComment(pokemonName)
    })
})

function loadComment(pokemonName) {
    let div = document.querySelector("#comment");
    div.innerHTML = "";
    
    fetch("http://localhost:3000/comment")
      .then((res) => res.json())
      .then((comment) => {
        let coUl = document.createElement("ul");
        for (let i = 0; i < comment.length; i++) {
          if (comment[i].name === pokemonName || comment[i].id_number === parseInt(pokemonName)) {
            let coLi = document.createElement("li");
            coLi.innerHTML = comment[i].commented;
            coUl.appendChild(coLi);
          }
        }
        div.appendChild(coUl);
      })
      .catch((err) => console.log(err));
  }