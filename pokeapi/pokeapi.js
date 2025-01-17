class PokemonCard {
    constructor(name, imageUrl, imageB, type1, type2) {
      this.name = name;
      this.imageUrl = imageUrl;
      this.imageB = imageB;
      this.type1 = type1;
      this.type2 = type2;
    }
  
    createCardElement() {
      const card = document.createElement('div');
      card.className = 'pokemon-card';
      
      // Contenedor interior de la carta (para el giro)
      const cardInner = document.createElement('div');
      cardInner.className = 'pokemon-card-inner';
  
      // Parte frontal de la carta (con la imagen)
      const cardFront = document.createElement('div');
      cardFront.className = 'pokemon-card-front';
      const img = document.createElement('img');
      img.src = this.imageUrl;
      img.alt = this.name;
      cardFront.appendChild(img);
      
      // Nombre del Pokémon
      const nameElement = document.createElement('h2');
      nameElement.textContent = this.name;
      cardFront.appendChild(nameElement);
      
      // Parte trasera de la carta (con la imagen y los tipos)
      const cardBack = document.createElement('div');
      cardBack.className = 'pokemon-card-back';
      const imgB = document.createElement('img');
      imgB.src = this.imageB;
      cardBack.appendChild(imgB);
      
      // Crear el elemento para el primer tipo
      const pkType = document.createElement('h2');
      pkType.textContent = this.type1;
      pkType.className = "tipo";
      
      // Colores de los tipos
      const typeColors = {
        fire: 'orange', grass: 'green', water: 'blue', electric: 'DarkGoldenRod',
        flying: 'aqua', bug: 'aquamarine', normal: 'rosybrown', poison: 'purple',
        dark: 'black', psychic: 'blueviolet', fairy: 'deeppink', dragon: 'red',
        ground: 'chocolate', rock: 'olive', steel: 'gray', fighting: 'salmon',
        ghost: 'slateblue', ice: 'powderblue'
      };
      
      pkType.style.backgroundColor = typeColors[this.type1.toLowerCase()] || 'transparent';
  
      // Crear el elemento para el segundo tipo (si existe)
      const pkType2 = document.createElement('h2');
      pkType2.textContent = this.type2;
      pkType2.className = "tipo";
      
      // Asignar color de fondo para el segundo tipo
      pkType2.style.backgroundColor = typeColors[this.type2.toLowerCase()] || 'transparent';
      if (this.type2.toLowerCase() === 'undefined') {
        pkType2.style.display = 'none';
      }
  
      // Agregar los tipos a la parte trasera de la carta
      cardFront.appendChild(pkType);
      cardFront.appendChild(pkType2);
  
      
  
      // Agregar las partes de la carta
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
  
      // Agregar la animación de giro al hacer clic
      card.addEventListener('click', () => {
        card.classList.toggle('flipped'); // Activa el giro
      });
  
      return card;
    }
  }
  
  // Variables globales
  let allPokemon = []; // Almacena todos los Pokémon obtenidos
  let filteredPokemon = []; // Almacena los Pokémon después de aplicar el filtro
  let currentPage = 1;
  const itemsPerPage = 20;
  let loadedPokemonCount = 0; // Contador de Pokémon cargados
  
  // Función para cargar todos los Pokémon
  function fetchAllPokemon() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon?limit=493`, true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          allPokemon = data.results; // Guardamos todos los Pokémon
          filteredPokemon = [...allPokemon]; // Inicialmente, sin filtro
          loadPokemonDetails(0); // Comenzamos a cargar los detalles del primer Pokémon
        } else {
          console.error(`Error al obtener los datos. Status: ${xhr.status}`);
        }
      }
    };
  
    xhr.onerror = function () {
      console.error('Error de red');
    };
  
    xhr.send();
  }
  
  // Función para cargar los detalles de cada Pokémon de forma secuencial
  function loadPokemonDetails(index) {
    if (index < allPokemon.length) {
      const pokemon = allPokemon[index];
  
      // Realizar la solicitud para obtener los detalles del Pokémon
      const xhr = new XMLHttpRequest();
      xhr.open('GET', pokemon.url, true);
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            pokemon.details = data; // Guardamos los detalles del Pokémon
  
            loadedPokemonCount++; // Aumentamos el contador de Pokémon cargados
  
            // Si todos los Pokémon están cargados, renderizamos la página
            if (loadedPokemonCount === allPokemon.length) {
              renderPage();
            } else {
              loadPokemonDetails(index + 1); // Cargamos el siguiente Pokémon
            }
          }
        }
      };
  
      xhr.onerror = function () {
        console.error('Error de red');
      };
  
      xhr.send();
    }
  }
  
  // Función para renderizar una página específica
  function renderPage() {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ""; // Limpiar el contenedor
  
    // Calcular el rango de Pokémon para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pokemonToShow = filteredPokemon.slice(startIndex, endIndex);
  
    // Crear y agregar las tarjetas de los Pokémon a mostrar
    pokemonToShow.forEach(pokemon => {
    const pokemonId = pokemon.url.split('/')[6]; // Extraemos el ID del Pokémon
  
    // Verificamos si la imagen de la generación II no existe y usamos la de la generación III
    
   let pokemonImageUrl = 
    pokemon.details.sprites.versions['generation-ii']?.crystal?.front_default ||
    pokemon.details.sprites.front_default;
  let backImage = pokemon.details.sprites.other['official-artwork']?.front_default || pokemon.details.sprites.front_default;
  
      
      
      const pokemonType1 = pokemon.details.types[0].type.name;
      const pokemonType2 = pokemon.details.types[1]?.type.name || ''; //Para que no dé fallo cuando no hay
      
      const name = pokemon.name;
      const nombre = name[0].toUpperCase() + name.slice(1);
      
      const tipo1 = pokemonType1[0].toUpperCase() + pokemonType1.slice(1);
      const tipo2 = pokemonType2[0]?.toUpperCase() + pokemonType2.slice(1);
      
      
      const pokemonCard = new PokemonCard(nombre, pokemonImageUrl, backImage, tipo1, tipo2);
      
      container.appendChild(pokemonCard.createCardElement());
  });
    
    
  
  // Actualizar el estado de los botones de navegación
  updateNavigationButtons();
  }
  
  // Función para actualizar el estado de los botones de navegación
  function updateNavigationButtons() {
    const atras = document.getElementById('atras');
    const adelante = document.getElementById('adelante');
  
    atras.disabled = currentPage === 1;
    adelante.disabled = currentPage >= Math.ceil(filteredPokemon.length / itemsPerPage);
  }
  
  // Función para aplicar un filtro
  function applyFilter(filter, filter2) {
    // Filtrar por nombre
    filteredPokemon = allPokemon.filter(pokemon => pokemon.name.startsWith(filter));
  
    // Filtrar por tipo, verificando si el tipo está dentro de los tipos del Pokémon
    filteredPokemon = filteredPokemon.filter(pokemon => {
      return pokemon.details.types.some(typeInfo => typeInfo.type.name.startsWith(filter2));
    });
  
    currentPage = 1; // Reiniciar a la primera página
    renderPage();
  }
  
  
  // Botones de navegación
  const atras = document.getElementById('atras');
  const adelante = document.getElementById('adelante');
  
  atras.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
  
  adelante.addEventListener('click', function () {
    if (currentPage < Math.ceil(filteredPokemon.length / itemsPerPage)) {
      currentPage++;
      renderPage();
    }
  });
  
  // Filtro de búsqueda
  const filterInput = document.getElementById('pokemon-filter');
  const filterTypeInput = document.getElementById('pokemon-filter-type');
  const buscarbutt = document.getElementById('buscar');
  buscarbutt.addEventListener('click', function () {
    const filter = filterInput.value.toLowerCase();
    const filter2 = filterTypeInput.value.toLowerCase()
    applyFilter(filter, filter2);
  });
  
  // Cargar Pokémon al cargar la página
  fetchAllPokemon();
  