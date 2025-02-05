// Definir los pares de kanji y significados
const kanjiPairs = [
  ["一", "Número 1"], 
  ["二", "Número 2"], 
  ["三", "Número 3"], 
  ["四", "Número 4"], 
  ["五", "Número 5"], 
  ["六", "Número 6"], 
  ["七", "Número 7"], 
  ["八", "Número 8"], 
  ["九", "Número 9"], 
  ["十", "Número 10"], 
  ["右", "Derecha"], 
  ["左", "Izquierda"], 
  ["日", "Día"], 
  ["月", "Mes"], 
  ["年", "Año"], 
  ["国", "País"], 
  ["人", "Persona"], 
  ["大", "Grande"], 
  ["本", "Libro"], 
  ["中", "Interior, dentro"], 
  ["雨", "Lluvia"], 
  ["円", "Círculo"], 
  ["下", "Abajo, debajo"], 
  ["何", "Qué"], 
  ["火", "Fuego"], 
  ["外", "Fuera"], 
  ["前", "Frente"], 
  ["出", "Salir, fuera"], 
  ["学", "Estudiar"], 
  ["間", "Intervalos, mientras"], 
  ["休", "Descansar"], 
  ["金", "Oro, dinero"], 
  ["気", "Espíritu"], 
  ["見", "Ver"], 
  ["午", "Mediodía"], 
  ["後", "Detrás"], 
  ["語", "Idioma"], 
  ["校", "Escuela"], 
  ["行", "Ir, yendo"], 
  ["高", "Alto, caro"], 
  ["今", "Ahora"], 
  ["山", "Montaña"], 
  ["子", "Niños"], 
  ["時", "Hora"], 
  ["車", "Carro"], 
  ["書", "Escribir"], 
  ["女", "Mujer"], 
  ["小", "Poco, pequeño"], 
  ["上", "Arriba"], 
  ["食", "Comer"], 
  ["水", "Agua"], 
  ["生", "Vida, nacimiento"], 
  ["西", "Oeste"], 
  ["千", "Mil"], 
  ["先", "Antes, anterior"], 
  ["川", "Río"], 
  ["男", "Hombre, masculino"], 
  ["長", "Largo"], 
  ["天", "Cielo"], 
  ["電", "Electricidad"], 
  ["土", "Suelo"], 
  ["東", "Este"], 
  ["読", "Leer"], 
  ["南", "Sur"], 
  ["入", "Ingresar, entrar"], 
  ["白", "Blanco"], 
  ["半", "Mitad"], 
  ["百", "Cien"], 
  ["北", "Norte"], 
  ["母", "Madre"], 
  ["父", "Padre, papá"], 
  ["聞", "Escuchar"], 
  ["毎", "Cada"], 
  ["話", "Historia, hablar"], 
  ["万", "Diez mil"], 
  ["名", "Nombre"], 
  ["木", "Árbol"], 
  ["友", "Amigo"], 
  ["来", "Venir"], 
  ["生", "Vida, crudo"]
];

// Recuperar las mejores puntuaciones
let bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];

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

// Funciones principales

// Iniciar el juego
function startGame() {
    matchedPairs = 0;
    errorCount = 0;
    errorDisplay.textContent = errorCount;
    kanjiPairs.sort(() => Math.random() - 0.5); // Mezclar los pares
    startTime = Date.now();
    loadNextSet();
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
        // Si la puntuación merece estar en el ranking, pedir el nombre
        const playerName = prompt("Enter your name:") || "AAA"; // Nombre predeterminado si no escriben nada
        const newScore = { name: playerName, score: finalScore };

        // Insertar la puntuación y reordenar el ranking
        bestScores.push(newScore);
        bestScores = bestScores
            .sort((a, b) => b.score - a.score) // Ordenar de mayor a menor
            .slice(0, 10); // Limitar a las 10 mejores

        // Guardar en localStorage
        localStorage.setItem('bestScores', JSON.stringify(bestScores));
    }

    setRecords(); // Actualizar el ranking en la interfaz

    alert(`Game Over!\nTime: ${timeTaken} seconds\nErrors: ${errorCount}\nScore: ${finalScore}`);
}

// Mostrar los mejores puntajes
function setRecords() {
    const recordsTableBody = document.querySelector("#records tbody");
    recordsTableBody.innerHTML = ""; // Limpiar la tabla para evitar duplicados

    bestScores.forEach((entry, index) => {
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

// Cargar el siguiente conjunto de kanjis
function loadNextSet() {
    if (kanjiPairs.length === 0) {
        endGame();
        return;
    }
    currentSet = kanjiPairs.splice(0, 5); // Obtener los siguientes 5 pares
    renderButtons();
}

// Renderizar los botones para los kanjis y significados
function renderButtons() {
    kanjiContainer.innerHTML = '';
    wordContainer.innerHTML = '';

    const kanjis = currentSet.map(pair => pair[0]);
    const meanings = currentSet.map(pair => pair[1]);

    const shuffledKanji = shuffleArray(kanjis);
    const shuffledMeanings = shuffleArray(meanings);

    shuffledKanji.forEach(kanji => {
        const button = document.createElement('button');
        button.textContent = kanji;
        button.dataset.value = kanji;
        button.dataset.type = 'kanji';
        button.addEventListener('click', handleButtonClick);
        kanjiContainer.appendChild(button);
    });

    shuffledMeanings.forEach(meaning => {
        const button = document.createElement('button');
        button.textContent = meaning;
        button.dataset.value = meaning;
        button.dataset.type = 'meaning';
        button.addEventListener('click', handleButtonClick);
        wordContainer.appendChild(button);
    });
}

// Función para manejar los clics en los botones
function handleButtonClick(e) {
    const button = e.target;
    if (selectedButtons.includes(button)) return; // Prevenir clics dobles

    selectedButtons.push(button);
    button.style.backgroundColor = '#d3f9d8'; // Resaltar la selección

    if (selectedButtons.length === 2) {
        checkMatch();
    }
}

// Verificar si los botones seleccionados hacen un par
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
            matchedPairs = 0; // Reiniciar para el siguiente conjunto
            loadNextSet();
        }
    } else {
        errorCount++;
        errorDisplay.textContent = errorCount;
    }

    selectedButtons = [];
    resetButtonStyles();
}

// Restablecer los estilos de los botones
function resetButtonStyles() {
    document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = '#fff';
    });
}

// Función para mezclar un arreglo
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Iniciar el juego
startGame();
