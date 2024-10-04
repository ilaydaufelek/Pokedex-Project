const pokeInput = document.querySelector("#poke-input");
const pokeContainer = document.querySelector(".poke-container");
const favoritesPoke = document.querySelector(".modal-body");
const cancelButton = document.querySelector("#cancel");
const modal = document.getElementById('modal');
const modalButton = document.querySelector("#favorite");
const favoriteLength = document.querySelector('.favorite-lenght');
const deleteAll=document.querySelector('#deleteAll')


// obje
const storage = new Storage();

const saveFavoritePokemonToStorage = (pokemon) => {
    let favorites = storage.getFromStorage();
    if (!favorites.some(fav => fav.id === pokemon.id)) {
        favorites.push(pokemon);
        localStorage.setItem('favorite', JSON.stringify(favorites));
        favoriteLength.textContent = favorites.length;
       
    } 
};
const removeFavoritePokemonFromStorage = (id) => {
    let favorites =storage.getFromStorage();
    favorites = favorites.filter(pokemon => pokemon.id !== id);
    localStorage.setItem('favorite', JSON.stringify(favorites));  
    updateFavoriteIcons();
    favoriteLength.textContent = favorites.length;
    
}






// Modal*******
eventListener();
function eventListener() {
    modalButton.addEventListener("click", () => {
        openModal();
        setFavoritesInModal();
        
       
    });
    cancelButton.addEventListener("click", cancel);
     deleteAll.addEventListener("click",deletePokeAll)

    document.addEventListener("DOMContentLoaded",  () => {
     
        const favorites = storage.getFromStorage()
        favoriteLength.textContent = favorites.length;


    });  
}

function deletePokeAll() {
   
    while (favoritesPoke.firstChild) {
        favoritesPoke.removeChild(favoritesPoke.firstChild);
    }
    
    localStorage.removeItem('favorite');
    favoriteLength.textContent = 0;
    updateFavoriteIcons();
    setFavoritesInModal();
    disabledButtonAllDelete()
}


function openModal() {
    modal.classList.remove('hidden');
}

function cancel() {
    modal.classList.add('hidden');
}

// colors
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff",
};

const pokemonCount = 203;

const initPokemon = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        createPokemonBox(data);
        updateFavoriteIcons();
        return data;
    } catch (err) {
        console.log(err);
    }
};

// datadan alıyoruz sayfamıza ekliyoruz
const createPokemonBox = async (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const type = pokemon.types[0].type.name;
    const weight = pokemon.weight;
    const color = colors[type];

    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add('poke-box');
    pokemonElement.style.backgroundColor = `${color}`;
    pokemonElement.innerHTML = `
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
        <i class="heart-b fa-regular fa-heart" data-id="${id}" style="color:red;background-color:#fff;padding:8px;border-radius:100%"></i>
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-type">type: ${type}</p>
        <p class="poke-weight">${weight}kg</p>`;

    pokeContainer.appendChild(pokemonElement);

    const heartIcon = pokemonElement.querySelector(".heart-b");
    heartIcon.addEventListener("click", function () {
        if (heartIcon.classList.contains("fa-regular")) {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
            saveFavoritePokemonToStorage(pokemon);
            
          
            
            
        } else {
            
            heartIcon.classList.remove("fa-solid");
            heartIcon.classList.add("fa-regular");
            removeFavoritePokemonFromStorage(pokemon.id);
            
       
            
        }
 

    }); 

}

const createFavoritePokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const type = pokemon.types[0].type.name;
    const weight = pokemon.weight;
    const color = colors[type];

    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add('poke-box');
    pokemonElement.style.backgroundColor = `${color}`;
    pokemonElement.innerHTML = `
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
        <i class="heart-b fa-regular fa-heart" data-id="${id}" style="color:red;background-color:#fff;padding:8px;border-radius:100%"></i>
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-type">type: ${type}</p>
        <p class="poke-weight">${weight}kg</p>`;
 
   
    favoritesPoke.appendChild(pokemonElement);
    
    const heartIcon = pokemonElement.querySelector(".heart-b");
    let favorites = storage.getFromStorage();
    if (favorites.some(fav => fav.id === pokemon.id)) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
    }


    heartIcon.addEventListener("click", function () {
        if (heartIcon.classList.contains("fa-regular")) {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
            saveFavoritePokemonToStorage(pokemon);
        } else {
            heartIcon.classList.remove("fa-solid");
            heartIcon.classList.add("fa-regular");
            removeFavoritePokemonFromStorage(pokemon.id);
        }
       
        
        setFavoritesInModal(); 
       
    }); 
    
}
const updateFavoriteIcons = () => {
    let favorites = storage.getFromStorage();
    const allHeartIcons = document.querySelectorAll(".heart-b");

    allHeartIcons.forEach(icon => {
        const pokemonId = icon.getAttribute('data-id');
        if (favorites.some(fav => fav.id === parseInt(pokemonId))) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }
    });
};
const setFavoritesInModal = async () => {
    while (favoritesPoke.firstChild) {
        favoritesPoke.removeChild(favoritesPoke.firstChild);
    }
   
    const favoritePokemons = await storage.getFromStorage();

    if (favoritePokemons.length === 0) {
        favoritesPoke.innerHTML = "<div>Favori Pokémon'un yok mu? :(</div>";
        
      
    } else {
        favoritePokemons.forEach(pokemon => createFavoritePokemonBox(pokemon));
         
    }

    disabledButtonAllDelete()
    
};

function disabledButtonAllDelete(){
    const favoriteCard =storage.getFromStorage()
    deleteAll.disabled = favoriteCard.length === 0; 
}


pokeInput.addEventListener("input", function (e) {
    const pokeNames = document.querySelectorAll(".poke-name");
    const search = pokeInput.value.toLowerCase().trim();
    pokeNames.forEach((pokeName) => {
        pokeName.parentElement.style.display = "block";
        if (!pokeName.innerHTML.trim().toLowerCase().includes(search)) {
            pokeName.parentElement.style.display = "none";
        }
    });
});




initPokemon();
