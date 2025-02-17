// URL base de PokeAPI para obtener la lista de Pokémon (20 Pokémon por página)
let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

// Contenedor donde se mostrarán los Pokémon
const pokemonContainerGlobal = document.querySelector(".pokemon-container-global");

// Variables para almacenar las URLs de las páginas anterior y siguiente
let previousPageUrl = null;
let nextPageUrl = null;

// Botones para navegar entre páginas
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");

// Función para obtener y mostrar los Pokémon
function obtenerPokemon(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      // Limpiar el contenedor global de Pokémon antes de agregar nuevos
      pokemonContainerGlobal.innerHTML = '';

      // Iteramos sobre la lista de Pokémon
      data.results.forEach(pokemon => {
        // Hacemos una solicitud para obtener los detalles de cada Pokémon
        const pokemonUrl = pokemon.url;
        
        const xhrDetails = new XMLHttpRequest();
        xhrDetails.open("GET", pokemonUrl, true);
        
        xhrDetails.onload = function() {
          if (xhrDetails.status === 200) {
            const pokemonData = JSON.parse(xhrDetails.responseText);

            const name = pokemonData.name;
            const imageUrl = pokemonData.sprites.front_default; // URL de la imagen
            
            const type1 = pokemonData.types[0] ? pokemonData.types[0].type.name : "N/A"; // Primer tipo
            const type2 = pokemonData.types[1] ? pokemonData.types[1].type.name : "N/A"; // Segundo tipo (si existe)

            // Crear un contenedor para el Pokémon
            const pokemonContainer = document.createElement("div");
            pokemonContainer.classList.add("pokemon-container");

            // Crear y agregar el nombre
            const nombre = document.createElement("h2");
            nombre.textContent = name;
            pokemonContainer.appendChild(nombre);

            // Crear y agregar la imagen
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = name;
            pokemonContainer.appendChild(img);

            // Crear y agregar el primer tipo
            const ptype1 = document.createElement("h3");
            ptype1.textContent = `Tipo 1: ${type1}`;
            pokemonContainer.appendChild(ptype1);

            // Crear y agregar el segundo tipo (solo si existe)
            if (type2 !== "N/A") {
              const ptype2 = document.createElement("h3");
              ptype2.textContent = `Tipo 2: ${type2}`;
              pokemonContainer.appendChild(ptype2);
            }

            // Agregar el contenedor del Pokémon al contenedor global
            pokemonContainerGlobal.appendChild(pokemonContainer);
          }
        };

        xhrDetails.onerror = function() {
          console.error('Hubo un problema con la solicitud del Pokémon');
        };

        xhrDetails.send();
      });

      // Actualizamos las URLs de las páginas siguiente y anterior
      previousPageUrl = data.previous;
      nextPageUrl = data.next;

      // Habilitar o deshabilitar los botones de paginación
      backButton.disabled = !previousPageUrl;
      nextButton.disabled = !nextPageUrl;
    } else {
      console.error('Error en la solicitud de la lista de Pokémon:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('Hubo un problema con la solicitud');
  };

  xhr.send();
}

// Llamamos a la función para obtener la primera página de Pokémon
obtenerPokemon(url);

// Asignar eventos a los botones
backButton.addEventListener("click", function() {
  if (previousPageUrl) {
    obtenerPokemon(previousPageUrl); // Cargar la página anterior
  }
});

nextButton.addEventListener("click", function() {
  if (nextPageUrl) {
    obtenerPokemon(nextPageUrl); // Cargar la siguiente página
  }
});
