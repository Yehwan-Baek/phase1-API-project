document.addEventListener("DOMContentLoaded", () => {
    const inputPokemon = document.querySelector("#inputPokemon")
    const formSearchPokemon = document.querySelector("#search-pokemon");
    const formSearchType = document.querySelector("#type-calculater");
    const commentForm = document.querySelector("#comment-form")
    formSearchPokemon.addEventListener("submit", (e) => {
        e.preventDefault();
        const pokemonName = inputPokemon.value.toLowerCase();
        loadComment(pokemonName)
        inputPokemon.value = ""
    })

    formSearchType.addEventListener("submit", (e) => {
      e.preventDefault();
      let div = document.querySelector("#comment");
      div.innerHTML = "";
    })

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
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
            coLi.style.listStyleType = "decimal";
            coLi.innerHTML = comment[i].commented;
            coUl.appendChild(coLi);
          }
        }
        coUl.style.width = "500px"
        coUl.style.margin = "0 auto"
        div.appendChild(coUl);
      })
      .catch((err) => console.log(err));
  }