const pokeInput=document.querySelector("#poke-input")
const pokeContainer=document.querySelector(".poke-container")
const button=document.querySelector(".btn-search")

//colors
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
    ice: "#e0f5ff ",
};

const pokemonCount=200;

const initPokemon=async()=>{
    for(let i=1 ; i<=pokemonCount; i++){
       
        
        await getPokemon(i)
    }
}





const getPokemon=async(id)=>{
   
    try{
        const url=`https://pokeapi.co/api/v2/pokemon/${id}`
        const res=await fetch(url)
    
        
        const data=await res.json();
         createPokemonBox(data); 

    }
    catch(err){
        
        console.log(err);
        
    }
}

const createPokemonBox=(pokemon)=>{
  
    
    const name =pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    const id=pokemon.id.toString().padStart(3,'0');
    const type=pokemon.types[0].type.name;
    const weight=pokemon.weight;
   const color=colors[type];

  const pokemonElement= document.createElement("div");
  pokemonElement.classList.add('poke-box');
   pokemonElement.style.backgroundColor=`${color}`
pokemonElement.innerHTML=` <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-type">type:${type}</p>
        <p class="poke-weight">${weight}kg</p>`
    
     pokeContainer.appendChild(pokemonElement)
}

initPokemon()

pokeInput.addEventListener("input",function(e){
    const pokeNames=document.querySelectorAll(".poke-name")
    const search=pokeInput.value.toLowerCase().trim();
    pokeNames.forEach((pokeName) => {
       pokeName.parentElement.style.display="block";

       if(!pokeName.innerHTML.trim().toLowerCase().includes(search)){
        pokeName.parentElement.style.display="none";
       }
    });
   
    
})

