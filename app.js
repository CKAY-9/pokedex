const pokedex = document.getElementById('pokedex');

const pokeRange = [
    1, 150
]

window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        pokeRange[0] += 150;
        pokeRange[1] += 150;
        fetchPokemon();
    }
}
 
const fetchPokemon = () => {
    if (pokeRange[1] >= 900) return;
    const promises = [];
    for (let i = pokeRange[0]; i <= pokeRange[1]; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    pokemon.map((pokeman) => {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `
            <img class="card-image" src="${pokeman.image}" />
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        `

        pokedex.appendChild(card);
    })
};

fetchPokemon();
