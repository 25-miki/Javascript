// Definir los pares de kanji y significados

var kanji_meanings = [["国", "País"]];
var kanji_kunyomi = [];
var kanji_onyomi = [];
var kanjiPairs = kanji_meanings;


fetch('N5.json')
    .then(response => response.json())
    .then(data => {
        kanji_meanings = data.meanings;
        kanji_kunyomi = data.kunyomi;
        kanji_onyomi = data.onyomi;

        kanjiPairs = kanji_meanings; 
        startGame();
})

.catch(error => console.error('Error al cargar el archivo JSON:', error));




const kanji_button = document.getElementById("kanji");
kanji_button.addEventListener("click", () => {
    kanjiPairs = kanji_meanings;
    startGame();
});

const onyomi = document.getElementById("onyomi");
onyomi.addEventListener("click", () => {
    kanjiPairs = kanji_onyomi;
    startGame();
});

const kunyomi = document.getElementById("kunyomi");
kunyomi.addEventListener("click", () => {
    kanjiPairs = kanji_kunyomi;
    startGame();
});


// Recuperar las mejores puntuaciones
let bestScores = JSON.parse(localStorage.getItem("bestScores") || "[]");

/*
function begin() {
    const mikiScore = { name: "Miki", score: 1000 };

    // Asegurarse de que bestScores está inicializado
    bestScores.push(mikiScore);

    // Ordenar y guardar
    bestScores = bestScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("bestScores", JSON.stringify(bestScores));

    setRecords();

    console.log("Se ha añadido la puntuación de miki!");
}

begin();
*/





// Variables de juego
let currentSet = [];
let selectedButtons = [];
let matchedPairs = 0;
let errorCount = 0;
let startTime;

// Referencias a los elementos DOM
const kanjiContainer = document.getElementById('kanji-container');
const wordContainer = document.getElementById('word-container');
const errorDisplay = document.getElementById('error-count');
const timeDisplay = document.getElementById('time-taken');

// Función para iniciar el juego
function startGame() {
    setRecords();
    matchedPairs = 0;
    errorCount = 0;
    errorDisplay.textContent = errorCount;

    kanjiPairs.sort(() => Math.random() - 0.5); // Mezclar los pares
    startTime = Date.now();
    loadNextSet();
    console.log("EL juego ha empezado");
}

// Terminar el juego
function endGame() {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const basePoints = 1000;
    const timePenalty = timeTaken * 5;
    const errorPenalty = errorCount * 20;
    const finalScore = Math.max(0, basePoints - timePenalty - errorPenalty);

    // Verificar si el puntaje merece estar en el top 10
    const lowestScore = bestScores.length === 10 ? bestScores[9].score : 0;

    if (finalScore > lowestScore || bestScores.length < 10) {
        const playerName = prompt("Enter your name:") || "AAA";
        const newScore = { name: playerName, score: finalScore };

        // Insertar y reordenar
        bestScores.push(newScore);
        bestScores = bestScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        // Guardar en localStorage
        localStorage.setItem('bestScores', JSON.stringify(bestScores));
    }

    setRecords(); // Actualizar el ranking

    alert(`Game Over!\nTime: ${timeTaken} seconds\nErrors: ${errorCount}\nScore: ${finalScore}`);
}

var topTen = bestScores.slice(0, 10);
// Actualizar los mejores puntajes en la tabla
function setRecords() {
    const recordsTableBody = document.querySelector("#records tbody");
    recordsTableBody.innerHTML = "";
    var topTen = bestScores.slice(0, 10);


    topTen.forEach((entry, index) => {
        const row = document.createElement("tr");
    
        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
    
        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;
    
        const scoreCell = document.createElement("td");
        scoreCell.textContent = entry.score;
    
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
    
        recordsTableBody.appendChild(row);
    });
    
}

/* Botón para agregar puntajes de prueba
const addMikiButton = document.getElementById("addMikiButton");
addMikiButton.addEventListener("click", () => {
    const mikiScore = { name: "Miki", score: 9999 };
    bestScores.push(mikiScore);

    // Ordenar y guardar
    bestScores = bestScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("bestScores", JSON.stringify(bestScores));

    setRecords(); // Actualizar la tabla

    addMikiButton.style.display = "none";
});

*/

// Cargar un nuevo conjunto de pares
function loadNextSet() {
    if (kanjiPairs.length === 0) {
        endGame();
        return;
    }

    currentSet = kanjiPairs.splice(0, 5);
    renderButtons();
}

// Mostrar botones de kanji y significado
function renderButtons() {
    kanjiContainer.innerHTML = '';
    wordContainer.innerHTML = '';

    const kanjis = currentSet.map(pair => pair[0]);
    const meanings = currentSet.map(pair => pair[1]);

    const shuffledKanji = shuffleArray(kanjis);
    const shuffledMeanings = shuffleArray(meanings);

    shuffledKanji.forEach(kanji => {
        const button = document.createElement('button');
        button.className = "botones game-button";
        button.textContent = kanji;
        button.dataset.value = kanji;
        button.dataset.type = 'kanji';
        button.addEventListener('click', handleButtonClick);
        kanjiContainer.appendChild(button);
    });

    shuffledMeanings.forEach(meaning => {
        const button = document.createElement('button');
        button.className = "botones game-button";
        button.textContent = meaning;
        button.dataset.value = meaning;
        button.dataset.type = 'meaning';
        button.addEventListener('click', handleButtonClick);
        wordContainer.appendChild(button);
    });
}

// Manejar clic en botones
function handleButtonClick(e) {
    const button = e.target;
    if (selectedButtons.includes(button)) return;

    selectedButtons.push(button);
    button.style.backgroundColor = '#d3f9d8';

    if (selectedButtons.length === 2) {
        checkMatch();
    }
}

// Verificar si es un par correcto
function checkMatch() {
    const [btn1, btn2] = selectedButtons;
    const isKanji = btn1.dataset.type === 'kanji';
    const kanji = isKanji ? btn1.dataset.value : btn2.dataset.value;
    const meaning = isKanji ? btn2.dataset.value : btn1.dataset.value;

    const pairExists = currentSet.some(pair => pair[0] === kanji && pair[1] === meaning);

    if (pairExists) {
        matchedPairs++;
        btn1.style.visibility = 'hidden';
        btn2.style.visibility = 'hidden';

        if (matchedPairs === 5) {
            matchedPairs = 0;
            loadNextSet();
        }
    } else {
        errorCount++;
        errorDisplay.textContent = errorCount;
    }

    selectedButtons = [];
    resetButtonStyles();
}

// Restablecer estilo de botones
function resetButtonStyles() {
    document.querySelectorAll('.game-button').forEach(boton => {
        boton.style.backgroundColor = '#fff';
    });
}

// Mezclar un arreglo
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Iniciar el juego
startGame();
